import os
import json
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Senior_Profile, Embedded_Senior_Profile
from accounts.models import Profile
from .serializers import SeniorRecommendSerializer, EmbeddedSeniorProfileSerializer, SeniorProfileSerializer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

# SentenceTransformer 모델 로드
model = SentenceTransformer('jhgan/ko-sroberta-multitask')

# 임베딩 생성 함수
def get_embedding(text):
    return model.encode(text).tolist()

# 코사인 유사도 계산 함수
def calculate_cosine_similarity(embedding1, embedding2):
    return cosine_similarity([embedding1], [embedding2])[0][0]

class SeniorRecommendView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # 현재 로그인한 사용자의 프로필 정보 가져오기
        user_profile = Profile.objects.get(user=request.user)
        user_profile_data = SeniorRecommendSerializer(user_profile).data

        # 비교 값의 임베딩 계산
        embedded_user = {key: get_embedding(str(value)) for key, value in user_profile_data.items() if value}

        # 선배 프로필 데이터 가져오기
        embedded_senior_profiles = Embedded_Senior_Profile.objects.all()
        embedded_senior_profiles_data = EmbeddedSeniorProfileSerializer(embedded_senior_profiles, many=True).data
        
        # 환경변수에서 가중치 가져오기
        weights_str = os.getenv('WEIGHTS', '{}')
        weights = json.loads(weights_str)

        
        similarities = []

        for profile in embedded_senior_profiles_data:
            similarity_sum = 0
            
            for key, user_embedding in embedded_user.items():
                profile_embedding = profile.get(key + '_embedding')
                
                if profile_embedding:
                    # 유사도 합 계산시 가중치 반영(percentage로 변환)
                    similarity_sum += weights[key] * calculate_cosine_similarity(profile_embedding, user_embedding) * 100
                    
            similarities.append({
                "id": profile["senior_info"]["id"],
                "name": profile["senior_info"]["name"], 
                "job": profile["senior_info"]["job"],
                "major": profile["senior_info"]["major"],
                "double_major": profile["senior_info"]["double_major"],
                "grades": profile["senior_info"]["grades"],
                
                "similarity_sum": similarity_sum
            })

        # 유사도 합계에 따라 정렬
        top5_similar = sorted(similarities, key=lambda x: x["similarity_sum"], reverse=True)[:5]
        
        # 정수 부분만 포맷하고 % 기호 추가
        for item in top5_similar:
            item["grades"] = f"학점 : {item['grades']}"
            item["similarity_sum"] = f"{int(item['similarity_sum'])}%"
            
        return Response(top5_similar, status=status.HTTP_200_OK)
    
class SeniorProfileDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, senior_id, *args, **kwargs):
        try:
            senior_profile = Senior_Profile.objects.get(id=senior_id)
            
        except Senior_Profile.DoesNotExist:
            return Response({"error": "Senior profile not found."}, status=status.HTTP_404_NOT_FOUND)
        
        senior_detail = SeniorProfileSerializer(senior_profile)
        
        return Response(senior_detail.data, status=status.HTTP_200_OK)