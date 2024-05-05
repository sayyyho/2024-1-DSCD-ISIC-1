# NB 함수만 있는 모듈 파일입니다.

import re
import nltk
from nltk.corpus import stopwords
from konlpy.tag import Komoran
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('punkt')
nltk.download('stopwords')

def p_duplicated(data):
    dup_resume = data.drop_duplicates(subset="text", keep='first')
    return dup_resume

def remove_kor_stopwords(text, stopwords):
    words = text.split()
    result = [word for word in words if word not in stopwords]
    return ' '.join(result)

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
    komoran = Komoran()
    lemmatizer = WordNetLemmatizer()

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
