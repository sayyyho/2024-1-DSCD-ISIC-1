from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

import pandas as pd

import time

driver = webdriver.Chrome()
okky_url = 'https://jobs.okky.kr/talents'
driver.get(okky_url)
time.sleep(2)

sen_lst = []
skills_lst = []
name_lst = []
career_lst = []

for page in range(1,21):
    print(page)
    for i in range(1, 21):

        xpath = '//*[@id="__next"]/main/div/div[3]/div[2]/button[' + str(i) + ']/div/'
        try:        
            name = driver.find_element(By.XPATH, xpath + 'div[1]/div[1]/div/div/div[1]/div[1]')
            name_lst.append(name.text)

            sentence = driver.find_element(By.XPATH, xpath + 'div[2]/div[1]')
            sen_lst.append(sentence.text)

        except ElementClickInterceptedException:
            print(f"Element click intercepted at index {i}, trying again...")
            time.sleep(1)
            continue
        
        except Exception as e:
            print(f"Error occurred at index {i}: {e}")
            break

        # 대표 스킬들
        # skills = []
        # for j in range(1,5):
        #     skill = driver.find_element(By.XPATH, xpath + 'div[3]/div[1]/span[' + str(j) + ']')
        #     skills.append(skill.text)
        # skills_lst.append(skills)

        user_button = driver.find_element(By.XPATH, '//*[@id="__next"]/main/div/div[3]/div[2]/button[' + str(i) + ']')
        user_button.click()
        driver.switch_to.window(driver.window_handles[-1])
        time.sleep(1)

        try:
            WebDriverWait(driver, 1).until(EC.alert_is_present())
            alert = driver.switch_to.alert
            alert.accept()

        except TimeoutException:
        # BeautifulSoup 객체 생성
            page_source = driver.page_source
            soup = BeautifulSoup(page_source, 'html.parser')

        # 기술 요소 선택
            skill_element = soup.select_one('#__next > main > div > div > div.w-full.max-w-\[950px\] > div > div > div:nth-child(2) > div.w-full.divide-y.divide-gray-200 > div > div.flex.flex-wrap.items-center.justify-start.gap-x-2\.5.gap-y-2.text-sm')
            # skill_element 에서 프런트엔드개발자를 가져옴 먼저
            inner_elements = skill_element.find_all() 
            
            skills = []
            for element in inner_elements:
                skills.append(element.text)
            skills_lst.append(skills)

        # 경력 가져오기
            carrer_path = '//*[@id="__next"]/main/div/div/div[1]/div/div/div[2]/div[2]/div/div[1]/span[2]'
            career = driver.find_element(By.XPATH, carrer_path)
            career_lst.append(career.text)

        finally:
            driver.back()
            time.sleep(1)
            
    page_path = '//*[@id="__next"]/main/div/div[3]/div[3]/nav/button[9]'
    page_button = driver.find_element(By.XPATH, page_path)
    page_button.click()
    time.sleep(0.5)

print(sen_lst)
print(skills_lst)
print(name_lst)
print(career_lst)

# WebDriver 종료
driver.quit()

assert len(name_lst) == len(skills_lst) == len(career_lst) == len(sen_lst), "not same for lenth with lists"

# 데이터프레임 생성
df = pd.DataFrame({
    'name': name_lst,
    'skills': skills_lst,
    'field': career_lst,
    'summary': sen_lst
})

# 데이터프레임 출력
print(df)

#df을 csv로 변환
df.to_csv('okkyjobs.csv', index=False,encoding='utf-8')