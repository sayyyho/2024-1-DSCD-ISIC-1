import warnings
warnings.filterwarnings('ignore')
import pandas as pd
import nltk
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

from nb_module import *

nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('punkt')
nltk.download('stopwords')

# 구축한 이력서 파일
resume = pd.read_csv('rallit_text.csv' ,encoding='utf-8')

# 중복값 처리
resume_dup = p_duplicated(resume)

stopwords_file = 'stopword.txt' # 알맞은 경로 입력
korean_stopwords = load_stopwords(stopwords_file)

# 영어와 한국어에 대한 불용어 제거
resume_dup['text'] = resume_dup['text'].apply(lambda x: remove_kor_stopwords(x, korean_stopwords))
resume_dup['text'] = resume_dup['text'].apply(lambda x: remove_eng_stopwords(x))

# 표제어 추출
resume_dup['text'] = resume_dup['text'].apply(lemmatize_text_mixed)

# 라벨 인코딩
le = LabelEncoder()
le.fit(resume_dup["job"])
resume_dup["job"] = le.transform(resume_dup["job"])

# tf-idf
tfidf = TfidfVectorizer()
tfidf.fit(resume_dup["text"])
text = tfidf.transform(resume_dup["text"])

# 모델 평가
test_size = 0.1
X_train, X_test, y_train, y_test = train_test_split(text, resume_dup["job"], test_size=test_size, random_state=42)

models = {
    'KNeighborsClassifier': KNeighborsClassifier(),
    'LogisticRegression': LogisticRegression(),
    'RandomForestClassifier': RandomForestClassifier(),
    'SVC': SVC(),
    'MultinomialNB': MultinomialNB()
}

accuracy_scores = {}

for model_name, model in models.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    accuracy_scores[model_name] = accuracy
    print(f'Accuracy of {model_name} on test set: {accuracy:.2f}')
