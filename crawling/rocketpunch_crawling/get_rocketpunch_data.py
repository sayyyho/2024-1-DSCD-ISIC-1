from bs4 import BeautifulSoup
import os
import time
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

from dotenv import load_dotenv


dotenv_path = os.path.join(os.path.dirname(__file__), '../.env')
load_dotenv(dotenv_path)

url = "https://www.rocketpunch.com/"

driver = webdriver.Chrome()
driver.get(url)

username = os.getenv('ROCKET_USERNAME')
password = os.getenv('ROCKET_PASSWORD')
# print(username, password)

total_data = []

def find_name(soup):
    try:
        name = soup.select_one('#people-header > div:nth-of-type(3) > div > div:nth-of-type(2) > h1')
        return name.text
    except Exception as e:
        print(e)
        return "알 수 없음"
def find_company(soup):
    try:
        company = soup.select_one('#people-career > div > div:nth-of-type(2) > div:nth-of-type(2) > a')
        return company
    except Exception as e:
        print(e)
        return "구직중"


login_button = driver.find_element(By.XPATH, '//*[@id="main-menu"]/div[2]/a[1]')
login_button.click()

time.sleep(1)

# 아이디 입력란에 입력 후 엔터
username_input = driver.find_element(By.XPATH, '//*[@id="id-login-email"]')
username_input.send_keys(username)


# 비밀번호 입력란에 입력 후 엔터
password_input = driver.find_element(By.XPATH, '//*[@id="id-login-password"]')
password_input.send_keys(password)

login_button = driver.find_element(By.XPATH, '//*[@id="form-login-inline"]/div[3]/button')
login_button.click()

time.sleep(1)

# skip_button = driver.find_element(By.XPATH, '/html/body/div[5]/div[5]/div[2]/div[2]/a[2]')
# skip_button.click()

# time.sleep(2)

driver.get("https://www.rocketpunch.com/people?page=2&specialty=devops&job=4&job=6")

time.sleep(3)



for i in range(1, 21):  # 1부터 20까지 (20개의 요소를 가정)
    data = {
        "name" : "",
        "company" : "",
        "school" : "",
        "project" : [],
        "certification" : []
    }
    element_xpath = f"//*[@id='search-results']/div[1]/div[{i}]/div[1]/a"
    element = driver.find_element(By.XPATH, element_xpath)
    element.click()
    # 클릭 후 충분한 반응 시간 대기 (필요한 경우)
    time.sleep(1)  # 예: 각 클릭 사이에 1초간 대기
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    name = find_name(soup)
    data['name'] = name.strip()
    company = find_company(soup)
    print(company)
    # total_data.append(data)
    # print(i)
    print(data)
    driver.back()


driver.quit()

# //*[@id="search-results"]/div[1]/div[1]/div[1]/a
# //*[@id="search-results"]/div[1]/div[2]/div[1]/a


# 아래는 그냥 함수화


# 회사도 있으면 가져오고 없으면 pass
# /html/body/div[5]/div[9]/div[2]/div[1]/section[1]/div/div[2]/a

# 학력도

# 프로젝트 있으면 가져오고 없으면 pass
# //*[@id="people-project-item-403616"]/div/div[2]/div[2]/strong

# 자격증도 있으면 가져오고 없으면 pass

# 활동분야도

# 이름
# //*[@id="people-header"]/div[3]/div/div[2]/h1












# driver.find_element(By.XPATH, '')

# people_btn = driver.find_element(By.XPATH, '//*[@id="main-menu"]/a[1]')
# people_btn.click()

# time.sleep(2)


# category_btn = driver.find_element(By.XPATH, '//*[@id="search-form"]/div[1]/div[3]/div[1]')
# category_btn.click()

# time.sleep(1)

# category_input = driver.find_element(By.XPATH, '//*[@id="search-form"]/div[1]/div[3]/div[2]/div/div[1]/input')
# time.sleep(1)

# category_input.send_keys("devops")

# //*[@id="search-form"]/div[1]/div[3]/div[2]/div/div[2]/a[7]
# category_select = driver.find_element(By.XPATH, '//*[@id="search-form"]/div[1]/div[3]/div[2]/div/div[2]/a[7]')
# category_select.click()