from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import pandas  as pd
import numpy as np

model = SentenceTransformer('jhgan/ko-sroberta-multitask') 

# 임베딩 생성 함수
def get_embedding(text):
    return model.encode(text)

# 코사인 유사도 계산 함수
def calculate_cosine_similarity(embedding1, embedding2):
    return cosine_similarity([embedding1], [embedding2])[0][0]

# weight 예시
weights = {
    "주전공": 0.025,
    "복수전공": 0.025,
    "학점": 0.05,
    "활용 스킬": 0.3,
    "수상 내역": 0.2,
    "동아리": 0.2,
    "프로젝트": 0.2}

# 각 열의 weight * 코사인 유사도의 합 계산 (null 값 제외)
def weighted_similarity_sum(row):
    weighted_sum = 0
    for column, weight in weights.items():
        similarity_score = row.get(column + "_cosine_similarity", np.nan)
        if pd.notnull(similarity_score):
            weighted_sum += similarity_score * weight
    return weighted_sum