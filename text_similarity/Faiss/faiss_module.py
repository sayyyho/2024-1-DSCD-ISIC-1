from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer('jhgan/ko-sroberta-multitask') 

# 임베딩 생성 함수
def get_embedding(text):
    return model.encode(text)