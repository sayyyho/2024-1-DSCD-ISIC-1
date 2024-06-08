import os
import re
from django.conf import settings
from accounts.models import Profile
from .serializers import JobRecommendSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.prompts import ChatPromptTemplate
from langchain_community.vectorstores import FAISS
from langchain.schema.runnable import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

def get_embeddings():
    return OpenAIEmbeddings(model="text-embedding-3-small")

def load_vectorstore():
    db_path = os.path.join(settings.STATICFILES_DIRS[0]) # 데이터베이스 경로 설정
    embeddings = get_embeddings()
    vectorstore = FAISS.load_local(db_path, embeddings, allow_dangerous_deserialization=True) # FAISS 인덱스 로드
    
    return vectorstore

def combined_user_profile(profile_data):
    profile_text = f"""
    "전공": "{profile_data['major']}",
    "복수전공": "{profile_data['double_major']}",
    "활용 스킬": "{profile_data['skills']}",
    "수상 내역": "{profile_data['award_detail']}",
    "동아리": "{profile_data['club_detail']}",
    "프로젝트": "{profile_data['project_detail']}"
    """
    
    return profile_text

def parse_result(text):
    recommendations = []
    sections = re.split(r'\n\n', text.strip())[1:3]  # 첫 번째 설명 부분 제외
    for section in sections:
        lines = section.strip().split('\n')
        job_name = re.sub(r'^\d+\.\s+', '', lines[0]).strip()  # 숫자와 점, 공백 제거
        recommendation_reason = ""
        improvement_points = ""
        
        for line in lines[1:]:
            if line.startswith('- 추천 이유:'):
                recommendation_reason = line.split(': ', 1)[1].strip()
            elif line.startswith('- 보완점:'):
                improvement_points = line.split(': ', 1)[1].strip()
            else:
                # 여러 줄로 이어지는 경우 고려
                if recommendation_reason and not improvement_points:
                    recommendation_reason += " " + line.strip()
                elif improvement_points:
                    improvement_points += " " + line.strip()
        
        recommendations.append({
            "job_name": job_name,
            "recommendation_reason": recommendation_reason,
            "improvement_points": improvement_points
        })
    
    return {"recommendations": recommendations}

class JobRecommendView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            user_profile = Profile.objects.get(user=request.user)
            
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

        user_profile_data = JobRecommendSerializer(user_profile).data
                
        llm = ChatOpenAI(model_name="gpt-3.5-turbo-0125", temperature=0)

        # 프롬프트 설정
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    """
                    당신은 직업 추천 컨설턴트입니다.
                    당신은 저장된 이력서를 활용하여 사용자의 이력서를 분석하고, 직업 추천/추천이유/보완점을 출력 포맷에 맞춰 작성해 주셔야 합니다.

                    추천 절차는 아래와 같습니다.
                    1. 사용자의 이력서와 저장된 이력서 파일과의 유사성을 평가합니다.
                    2. 저장된 이력서 데이터에서 유사성이 높은 상위 2개의 직업을 저장합니다.
                    3. 유사성이 높은 순서대로 출력 포맷에 맞춰 직업, 추천 이유, 보완점을 출력합니다.
                    4. 추천 이유: 해당 직업을 추천하는 구체적인 이유를 제공합니다.
                    5. 보완점: 해당 직업에 더 적합해지기 위해 보완해야 할 주요 스킬이나 경험을 제안합니다.
                    6. 각 추천 직업에 대해 다음과 같은 형식으로 정보 제공:

                    1. 직업명
                    - 추천 이유: 해당 직업을 추천하는 구체적인 이유
                    - 보완점: 해당 직업에 더 적합해지기 위해 이력서에서 보완해야 할 주요 스킬이나 경험을 제안


                    아래는 잘 작성된 몇 가지 이력서 첨삭 예시입니다.
                    아래 예시들을 **참고만 하고**, 저장된 이력서 데이터와 비교했을때 사용자가 보완해야할 점을 최대한 반영하여 이력서를 첨삭해주세요.

                    1. 데이터 엔지니어
                    - 추천 이유: Python과 SQL을 활용한 데이터 처리 능력이 있습니다. 데이터베이스 설계와 관리에 대한 이해를 바탕으로 데이터 인프라를 구축 및 최적화하는 역량이 있습니다.
                    - 보완점: Python, Java, Scala 등 주요 코딩 스킬을 향상시키고, Spark, Hadoop 같은 분산처리 시스템 아키텍처에 대한 이해를 높여야 합니다. REST API 개발, AWS 인프라 운영과 ETL 파이프라인 구축 경험을 통해 실시간 대용량 데이터 처리 경험을 쌓는 것이 중요합니다.

                    2. 백엔드 개발자
                    - 추천 이유: Java, Python 등의 프로그래밍 언어 능력과 MySQL, Oracle 등의 DBMS 이해 능력이 있습니다. 복잡한 백엔드 시스템의 아키텍처 설계 및 개발 경험을 갖추고 있습니다.
                    - 보완점: Spring Boot, Django와 같은 웹 프레임워크를 통한 RESTful API 개발 경험을 확대하고, AWS 클라우드 서비스와 Docker, Kubernetes를 사용한 컨테이너 기반 배포와 오케스트레이션 능력을 개발하는 것이 중요합니다. 또한, 마이크로서비스 아키텍처에 대한 이해를 키워야 합니다.

                    """
                ),
                ("human", "{question}")
            ]
        )
            
        vectorstore = load_vectorstore()
        retriever = vectorstore.as_retriever(search_kwargs={'k': 5})

        chain = (
            {
                "context": retriever,
                "question":RunnablePassthrough(),
            }
            | prompt
            | llm
            | StrOutputParser()
        )
        
        question = combined_user_profile(user_profile_data) # 사용자 정보 입력
        chain_result = chain.invoke(question) # llm 답변 반환
        
        data = parse_result(chain_result)
        
        return Response(data, status=status.HTTP_200_OK)