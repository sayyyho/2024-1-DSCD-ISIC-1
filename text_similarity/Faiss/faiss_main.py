from faiss_module import *

import faiss
import pandas as pd
import numpy as np

df = pd.read_csv(".csv", encoding = "cp949") # 선배 데이터 가져오기
resume = df.copy()
resume.drop(columns=["직무"], inplace=True)

# 필요에 따라 아래는 삭제 / 사람 이름 따로 설정
resume["이름"] = "한종원" 

# input 값들
comparison_values = {
    "주전공": "산업시스템공학",
    "복수전공": "데이터사이언스연계전공",
    "학점": "3.5",
    "활용 스킬": "Python, C++",
    "수상 내역": "데이터분석 관련",
    "동아리": "백엔드 관련",
    "프로젝트": "Project1"
}

# null 값이 있는 열 제외
comparison_values_non_null = {key : value for key, value in comparison_values.items() if value}

# 각 열 embedding
columns_to_embed = [column for column in comparison_values_non_null.keys()]

for column in columns_to_embed:
    resume[column + "_embedding"] = resume[column].apply(lambda x: get_embedding(str(x)) if pd.notnull(x) else np.nan)

# 비교 값들 embedding
comparison_embeddings = {key: get_embedding(str(value)) for key, value in comparison_values.items()}

# Faiss 인덱스 초기화 & 임베딩 추가
index_dict = {}
for column in columns_to_embed:
    # 해당 열이 null이 아닌 경우에만 임베딩을 생성하여 Faiss 인덱스에 추가
    embeddings = resume[column + "_embedding"].dropna().tolist()
    embeddings_np = np.array(embeddings, dtype=np.float32)

    # L2 정규화
    faiss.normalize_L2(embeddings_np)

    index = faiss.IndexFlatIP(embeddings_np.shape[1])
    index.add(embeddings_np)
    index_dict[column] = index

# 각 열 유사도 계산 & Faiss를 이용한 search
for column in columns_to_embed:
    query_embedding = np.array([comparison_embeddings[column]], dtype=np.float32)

    # L2 정규화
    faiss.normalize_L2(query_embedding)

    # 해당 열이 null이 아닌 경우에만 계산
    if not resume[column + "_embedding"].isnull().all():
        distances, indices = index_dict[column].search(query_embedding, len(resume))
        similarities = distances[0]  # Faiss는 내적을 사용하므로 유사도 값을 그대로 사용
        resume[column + "_similarity"] = similarities

# 각 열의 유사도의 합 계산
resume["similarity_sum"] = resume[[col + "_similarity" for col in columns_to_embed]].sum(axis=1, skipna=True)

# 유사도 출력
for index, row in resume.iterrows():
    print(f"Row {index + 1}:")
    for column in columns_to_embed:
        similarity_score = row.get(column + "_similarity")
        if similarity_score is not None:
            print(f"  {column} 유사도: {similarity_score:.4f}")

# 상위 3개의 유사도 추출
top3_similar = resume.nlargest(3, "similarity_sum")[["이름", "similarity_sum"]]
print(top3_similar)
