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

# .env 파일 로드
load_dotenv()

company_list = []
spec_list = []
resume_list = []

# Chrome WebDriver 경로 설정
url = "https://ddp.dongguk.edu/login.jsp"

# Selenium WebDriver로 Chrome 실행
driver = webdriver.Chrome()
driver.get(url)



# 로그인 정보
# .env파일 만들어서 학번이랑 비번 입력해주세요!
username = os.getenv('USERNAME')
password = os.getenv('PASSWORD')


# 아이디 입력란에 입력 후 엔터
username_input = driver.find_element(By.XPATH, '//*[@id="userid"]')
username_input.send_keys(username)


# 비밀번호 입력란에 입력 후 엔터
password_input = driver.find_element(By.XPATH, '//*[@id="userpw"]')
password_input.send_keys(password)

# 로그인 버튼 클릭

login_button = driver.find_element(By.XPATH, '//*[@id="login1"]/div[1]/a')
login_button.click()

# 로그인 확인을 위해 2초 대기
time.sleep(1)


career_button = driver.find_element(By.XPATH, '//*[@id="m_container"]/div[4]/div/div[2]/div/ul/li/a')
career_button.click()

it_button = driver.find_element(By.XPATH, '//*[@id="ind_div"]/li[6]/a')
it_button.click()

search_button = driver.find_element(By.XPATH, '//*[@id="searchForm"]/fieldset/button')
search_button.click()

for page in range(1, 151):
    print(page)
    for i in range(1, 11):
        # 각 tr 요소의 Xpath를 동적으로 생성
        xpath = '//*[@id="GuestBookForm"]/table/tbody/tr[' + str(i) + ']/td[1]/a'
        
        # Xpath를 이용하여 요소 찾기
        company_button = driver.find_element(By.XPATH, xpath)
        company_button.click()
        driver.switch_to.window(driver.window_handles[1])
        try:
            WebDriverWait(driver, 1).until(EC.alert_is_present())
            alert = driver.switch_to.alert
            alert.accept()
        except TimeoutException:
        # BeautifulSoup 객체 생성
            page_source = driver.page_source
            soup = BeautifulSoup(page_source, 'html.parser')

        # ul 요소 선택
            ul_element = soup.select_one('#pright > div > div:nth-of-type(2) > div:nth-of-type(1) > ul')
            company_names = soup.h1.text

            pattern = r'(?<=\b)[^\d]+(?=\s합격자 자기소개서)'

            company_names = re.findall(pattern, company_names)

            company_list.append(company_names)
            inner_elements = ul_element.find_all()

        # 추출한 하위 요소 출력
            specs = []
            resume = []
            for element in inner_elements:
                specs.append(element.text)
            spec_list.append(specs)
            
     
            div_elements = soup.find_all('div')

            # 선택된 <div> 요소들 중에서 style 속성이 "line-height:22px;" 인 요소들을 추출 -> 자소서 부분.
            common_elements = [div for div in div_elements if div.get('style') == 'line-height:22px;']

            for element in common_elements:
                try:
                    if element:
                        resume_list.append(element.text)
                        print(element.text)
                except Exception as e:
                    driver.close()
       
            driver.close()
            
        finally:
            time.sleep(1)   
            driver.switch_to.window(driver.window_handles[0])
    if (page + 3) % 10 == 0:
        page_path = '//*[@id="container"]/ul[2]/li[10]/a'
    else:
        page_path = '//*[@id="container"]/ul[2]/li[' + str((page + 3) % 10) + ']/a'

    page_button = driver.find_element(By.XPATH, page_path)
    page_button.click()    

print(company_list)
print(spec_list)
print(resume_list)

time.sleep(5)

# # WebDriver 종료
driver.quit()
