from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer('jhgan/ko-sroberta-multitask') 

# 임베딩 생성 함수
def get_embedding(text):
    return model.encode(text)

# 코사인 유사도 계산 함수
def calculate_cosine_similarity(embedding1, embedding2):
    return cosine_similarity([embedding1], [embedding2])[0][0]