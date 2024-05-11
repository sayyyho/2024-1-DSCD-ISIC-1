from bs4 import BeautifulSoup
import os
import time
import re
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
        company = soup.select_one('#people-career > div > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > a')
        return company.text
    except Exception as e:
        print(e)
        return "구직중"
def find_school(soup):
    try:
        school_name = soup.select_one('#people-education > div >  div:nth-of-type(2) >  div:nth-of-type(2) >  div:nth-of-type(1)')
        major = soup.select_one('#people-education > div >  div:nth-of-type(2) >  div:nth-of-type(2) >  div:nth-of-type(2)')
        if school_name and major:
            return [school_name.text.strip(), major.text.strip()]
        else:
            return ["미공개"]
    except Exception as e:
        print(e)
        return ["미공개"]

def find_project(soup):
    try:
        projects = []
        project = soup.select_one('#people-project > div')
        if project:
            items = project.find_all('div', class_='item')
            for item in items:
                project_info = item.find('div', class_="desc")
                project_info = project_info.text
                projects.append(project_info.strip())
        return projects
    except Exception as e:
        print(e)
        return ["프로젝트 경험 없음"]
def find_award(soup):
    try:
        awards = []
        award = soup.select_one('#people-award > div')
        if award:
            items = award.find_all('div', class_='item')
            for item in items:
                award_name = item.find('div', class_="title")
                awards.append(award_name.text.replace('\xa0', ' '))
        return awards
    except Exception as e:
        print(e)
        return ["수상 경험 없음"]
    
def find_certification(soup):
    try:
        certifications = []
        certification = soup.select_one('#people-certification > div')
        items = certification.find_all('div', class_='item')
        for item in items:
                certification_name = item.find('div', class_="title")
                certifications.append(certification_name.text.strip())
        return certifications
    except Exception as e:
        return ["자격증 없음"]

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


driver.get("https://www.rocketpunch.com/people?job=4&job=6&specialty=devops")

time.sleep(3)


for page in range(1,6):
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, 'html.parser')
    for i in range(1, 21):    
        data = {
            "name" : "",
            "company" : "",
            "school" : [],
            "projects" : [],
            "award" : [],
            "certification" : []
        }
        element_xpath = f"//*[@id='search-results']/div[1]/div[{i}]/div[1]/a"
        element = driver.find_element(By.XPATH, element_xpath)
        element.click()
        # 클릭 후 충분한 반응 시간 대기 (필요한 경우)
        time.sleep(2)  # 예: 각 클릭 사이에 1초간 대기
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, 'html.parser')  
        name = find_name(soup)
        data['name'] = name.strip()
        company = find_company(soup)
        data["company"] = company.strip()
        school_info = find_school(soup)
        data["school"] = school_info
        projects = find_project(soup)
        data['projects'] = projects
        awards = find_award(soup)
        data['award'] = awards
        certification = find_certification(soup)
        data['certification'] = certification
        total_data.append(data)
        print(data)
        driver.back()
    driver.get(f"https://www.rocketpunch.com/people?page={page+1}&job=4&job=6&specialty=devops")
    time.sleep(2)
    # print(total_data)   

driver.quit()