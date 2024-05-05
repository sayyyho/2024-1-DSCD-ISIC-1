# NB 전체 코드 입니다 >>> 일단은 전체 코드로 짜놓고 main.py 와 modele.py 로 나눴습니다.

import os  
import warnings
warnings.filterwarnings('ignore')
import numpy as np
import pandas as pd  
import re

import nltk
from nltk.corpus import stopwords
from konlpy.tag import Komoran
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

from sklearn.preprocessing import LabelEncoder 
from sklearn.model_selection import train_test_split 
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score  
from sklearn.naive_bayes import MultinomialNB

nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('punkt')
nltk.download('stopwords')

# 구축한 이력서 파일
resume = pd.read_csv('rallit_text.csv' ,encoding='utf-8')

# --------------------
# 데이터 중복 처리
def p_duplicated(data):
    dup_resume = data.drop_duplicates(subset="text", keep='first')
    
    return dup_resume

resume_dup = p_duplicated(resume)

# --------------------
# 한국어 불용어 처리
def remove_kor_stopwords(text, stopwords):
    words = text.split()
    result = [word for word in words if word not in stopwords]
    return ' '.join(result)

# 영어 불용어 처리
def remove_eng_stopwords(text):
    url_pattern = re.compile(r'https?://\S+|www\.\S+')
    email_pattern = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')

    clean_text = url_pattern.sub('', text)

    clean_text = email_pattern.sub('', clean_text)

    clean_text = re.sub(r'[^\w\s]', '', clean_text)

    stop_words = set(stopwords.words('english'))
    clean_text = ' '.join(word for word in clean_text.split() if word.lower() not in stop_words)

    return clean_text

def load_stopwords(file_path):
    with open(file_path, 'r', encoding= "utf-8") as file:
        stopwords = [line.strip() for line in file]
    return stopwords

stopwords_file = 'stopword.txt' # 경로 입력
korean_stopwords = load_stopwords(stopwords_file)

resume_dup['text'] = resume_dup['text'].apply(lambda x: remove_kor_stopwords(x, korean_stopwords))
resume_dup['text'] = resume_dup['text'].apply(lambda x: remove_eng_stopwords(x))

# --------------------
## Pos taggin 방법 1

komoran = Komoran()
lemmatizer = WordNetLemmatizer()

def get_wordnet_pos_kor(tag):
    if tag.startswith('N'):
        return wordnet.NOUN
    elif tag.startswith('V'):
        return wordnet.VERB
    elif tag.startswith('M'):
        return wordnet.ADV
    elif tag.startswith('VA'):
        return wordnet.ADJ
    else:
        return None

# Lemmatization >> 영와 한국어를 각각 다르게
def lemmatize_text_mixed(text):
    komoran = Komoran()
    lemmatizer = WordNetLemmatizer()
    lemmatized_words = []

    # 문장을 단어로 분리
    words = nltk.word_tokenize(text)

    for word, pos in nltk.pos_tag(words):
        if komoran.pos(word):
            for lemma_word, lemma_tag in komoran.pos(word):
                wn_pos = get_wordnet_pos_kor(lemma_tag)
                if wn_pos:
                    lemmatized_words.append(lemmatizer.lemmatize(lemma_word, wn_pos))
                else:
                    lemmatized_words.append(lemma_word)
        else:
            wn_pos = get_wordnet_pos(pos)
            if wn_pos:
                lemmatized_words.append(lemmatizer.lemmatize(word, wn_pos))
            else:
                lemmatized_words.append(word)

    return ' '.join(lemmatized_words)

resume_dup['text'] = resume_dup['text'].apply(lemmatize_text_mixed)

# --------------------
## Pos tagging 방법 2

komoran = Komoran()
lemmatizer = WordNetLemmatizer()

def get_wordnet_pos_kor(tag):
    if tag.startswith('N'):
        return wordnet.NOUN
    elif tag.startswith('V'):
        return wordnet.VERB
    elif tag.startswith('M'):
        return wordnet.ADV
    elif tag.startswith('VA'):
        return wordnet.ADJ
    else:
        return None
def get_wordnet_pos(pos_tag):
    if pos_tag.startswith('V'):
        return 'v'
    elif pos_tag.startswith('N'):
        return 'n'
    elif pos_tag.startswith('J'):
        return 'a'
    elif pos_tag.startswith('R'):
        return 'r'
    else:
        return None

def lemmatize_text_mixed(text):
    lemmatized_words = []

    # 한국어 >> 형태소 단위로 token화 및 표제어 추출
    korean_tokens = komoran.morphs(text)

    for word, tag in nltk.pos_tag(korean_tokens):
        wn_pos = get_wordnet_pos_kor(tag)
        if wn_pos:
            lemmatized_words.append(lemmatizer.lemmatize(word, wn_pos))
        else:
            lemmatized_words.append(word)

    # 영어 >> 토큰화 및 표제어 추출
    english_tokens = nltk.word_tokenize(text)
    for word, pos in nltk.pos_tag(english_tokens):
        wn_pos = get_wordnet_pos(pos)
        if wn_pos:
            lemmatized_words.append(lemmatizer.lemmatize(word, wn_pos))
        else:
            lemmatized_words.append(word)

    return ' '.join(lemmatized_words)

resume_dup['text'] = resume_dup['text'].apply(lemmatize_text_mixed)

# --------------------
# 라벨 인코딩
le = LabelEncoder()
le.fit(resume_dup["job"])
resume_dup["job"] = le.transform(resume_dup["job"])

# --------------------
# Tf -IDF 수행
tfidf = TfidfVectorizer()
tfidf.fit(resume_dup["text"])
text = tfidf.transform(resume_dup["text"])

# --------------------
# training 및 test 데이터 셋 구축
test_size = 0.1
X_train, X_test, y_train, y_test = train_test_split(text, resume_dup["job"], test_size = test_size, random_state=42)

# --------------------
# 각 모델들 성능 평가

models = {
    'KNeighborsClassifier': KNeighborsClassifier(),
    'LogisticRegression': LogisticRegression(),
    'RandomForestClassifier': RandomForestClassifier(),
    'SVC': SVC(),
    'MultinomialNB': MultinomialNB()
}

# Dictionary to hold accuracy scores
accuracy_scores = {}

# Train and evaluate each model
for model_name, model in models.items():
    # Train the model
    model.fit(X_train, y_train)

    # Predict on the test set
    y_pred = model.predict(X_test)

    # Calculate accuracy
    accuracy = accuracy_score(y_test, y_pred)
    accuracy_scores[model_name] = accuracy

    print(f'Accuracy of {model_name} on test set: {accuracy:.2f}')

# 다중 class 에 대한 f1-score 성능 평가 ::
# f1 = f1_score(y_test, y_pred, average='weighted')