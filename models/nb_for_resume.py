import os  
import warnings
warnings.filterwarnings('ignore')
import numpy as np
import pandas as pd  
import matplotlib.pyplot as plt 
import seaborn as sns  
import re


from nltk.corpus import stopwords  
from sklearn.preprocessing import LabelEncoder 
from sklearn.model_selection import train_test_split 
from sklearn.feature_extraction.text import TfidfVectorizer  
from sklearn.neighbors import KNeighborsClassifier 
from sklearn.metrics import accuracy_score  
from sklearn.naive_bayes import MultinomialNB
from sklearn.multiclass import OneVsRestClassifier
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

# 구축한 이력서 파일
resume = pd.read_csv('resume_text.csv' ,encoding='utf-8')

# 데이터 중복 처리
def p_duplicated(data):
    dup_resume = data[data.duplicated(keep='first')]
    
    return dup_resume



resume_dup = p_duplicated(resume)

