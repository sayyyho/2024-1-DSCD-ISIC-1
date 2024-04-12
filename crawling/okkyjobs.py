from bs4 import BeautifulSoup
import time
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

from dotenv import load_dotenv
import os
import re

import time

driver = webdriver.Chrome()
okky_url = 'https://jobs.okky.kr/talents'
driver.get(okky_url)
time.sleep(2)

# act = ActionChains(okky_url)  # 드라이버에 동작을 실행시키는 명령어를 act로 지정
#
# element1 = dr.find_element_by_css_selector('선택자')  # 동작 할 요소 선택
# act.click(element1).perform()  # element1  클릭 동작을 수행

sen_lst = []
skills_lst = []
name_lst = []

for i in range(1,21):
    sentence = driver.find_element(By.XPATH, '//*[@id="__next"]/main/div/div[3]/div[2]/button[' + str(i) + ']/div/div[2]/div[1]')
    sen_lst.append(sentence.text)

    xpath = '//*[@id="__next"]/main/div/div[3]/div[2]/button[' + str(i) + ']/div/'

    sentence = driver.find_element(By.XPATH, xpath + 'div[2]/div[1]')
    sen_lst.append(sentence.text)

    name = driver.find_element(By.XPATH, xpath + 'div[1]/div[1]/div/div/div[1]/div[1]')
    name_lst.append(name)

    # 대표 스킬들
    skills = []
    for j in range(1,5):
        skill = driver.find_element(By.XPATH, xpath + 'div[3]/div[1]/span[' + str(j) + ']')
        skills.append(skill.text)
    skills_lst.append(skills)

    user_button = driver.find_element(By.XPATH,'//*[@id="__next"]/main/div/div[3]/div[2]/button[' + str(i) + ']')
    user_button.click()
    driver.switch_to.window(driver.window_handles[0])
    try:
        WebDriverWait(driver, 1).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        alert.accept()
    except TimeoutException:
    # BeautifulSoup 객체 생성
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, 'html.parser')

        

print(sen_lst)
print(skills_lst)