from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import linkareer

driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
linkareer.url_crawl(driver=driver)