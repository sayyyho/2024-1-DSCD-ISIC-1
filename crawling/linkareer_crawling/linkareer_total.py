# linkareer_total.py

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import linkareer
import pandas as pd

url="linkareer_link.txt"
driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
df = pd.DataFrame(columns=['info', 'specification', 'self_intro'])

f=open(url,'r')
while True:
    txt_link = f.readline()
    if txt_link=="":
        break
    person = linkareer.self_introduction(driver=driver, url=txt_link)
    df = pd.concat([df,person])
    
    df.to_csv('output.csv', encoding='utf-8')
    
driver.close()
f.close()

