from selenium import webdriver
from selenium.webdriver.common.by import By
import pandas as pd
from dotenv import load_dotenv
import os
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAI

max_tokens = 3500

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
llm = OpenAI(model_name="gpt-3.5-turbo-instruct")

prompt_template = """{self_introduction}, in this applicant You should extract key skills without abstract expressions and summarize in one line.
                    ex) python, java, Opic IM2, TOEIC 800
                    """
                    

prompt = PromptTemplate(template=prompt_template,                        
                        input_variables=['self_introduction'])

# 토큰 수 제한 함수
def limit_string_tokens(string):
    tokens = string.split()[:max_tokens]
    return ' '.join(tokens)

# url 크롤링 함수
def url_crawl(driver:webdriver.Chrome):
    url_list = []
    f=open(".\linkareer_link.txt",'w')
    for page in range(1,8):
        url = "https://linkareer.com/cover-letter/search?page="+str(page)+"&role=데이터분석&sort=RELEVANCE&tab=all"
        driver.get(url)
        driver.find_element(By.XPATH,"/html/body/div[1]/div[1]/div/div[4]/div/div[2]/div/div[3]/div[1]/div[31]/div[1]/a/div/div/p[2]")
        driver.implicitly_wait(5)
        url_tag = driver.find_elements(By.TAG_NAME,'a')
        for tag in url_tag:
            url_name = tag.get_attribute('href')
            if "cover-letter" in url_name and "search" not in url_name:
                print(url_name)
                url_list.append(url_name)
    driver.close()
    for content in list(set(url_list)):
        f.write(content+"\n")
    f.close()

# 내용 크롤링 함수
def self_introduction(driver:webdriver.Chrome,url):
    person = {}
    dataset = []
    if url:
        driver.get(url)
        info = driver.find_element(By.XPATH,'/html/body/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[1]/div/div/div[2]/h1')
        specification=driver.find_element(By.XPATH,'/html/body/div[1]/div[1]/div[4]/div/div[2]/div/div[2]/div[1]/div/div/div[3]/h3')
        content=driver.find_element(By.ID,"coverLetterContent")
        
        info = info.text # 지원자 정보 ex)  '행정안전부 / 공공데이터 개방 / 2020 하반기'
        info = info.split('/')
        person['info'] = info[1] # 직종만 추출
        person['specification'] = specification.text # 지원자 스펙
        
        llm_chain = LLMChain(prompt=prompt, llm=llm)
        print(len(limit_string_tokens(content.text)))
        
        inputs = {'self_introduction' : limit_string_tokens(content.text)} # 지원자 자소서 분석
        person['self_intro'] = llm_chain.invoke(inputs)['text']
        dataset.append(person)
        
    df1 = pd.DataFrame(data=dataset, columns=['info', 'specification', 'self_intro'])
        
    return df1