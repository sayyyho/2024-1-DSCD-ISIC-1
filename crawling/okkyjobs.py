from selenium import webdriver
from selenium.webdriver import ActionChains

import time

driver = webdriver.Chrome()
okky_url = "https://jobs.okky.kr/talents?page=1"
driver.get(okky_url)
time.sleep(2)

# act = ActionChains(okky_url)  # 드라이버에 동작을 실행시키는 명령어를 act로 지정
#
# element1 = dr.find_element_by_css_selector('선택자')  # 동작 할 요소 선택
# act.click(element1).perform()  # element1  클릭 동작을 수행

lst = []
# XPath를 찾아서 리스트로 저장합니다.
elements = driver.find_elements_by_xpath("/html/body/div/main/div/div[3]/div[2]/button[1]/div/div[2]/div[1]")

# 결과를 담을 빈 리스트를 만듭니다.
xpath_list = []

# 각 요소의 텍스트를 가져와 리스트에 추가합니다.
for element in elements:
    xpath_list.append(element.text)

# 리스트 출력
print(xpath_list)

# Selenium 세션 종료
driver.quit()