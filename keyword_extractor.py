import requests
import html2text
from bs4 import BeautifulSoup

f=open("banking_sites","r")
intersect = []
urls = f.read()
res = ""
for url in urls:
    try:
        page = requests.get(url)       
        html_code = page.content       
    except Exception as e:
        print(e)
    try:
        soup = BeautifulSoup(html_code, 'html.parser')  
        texts = soup.findAll(text=True)                 
        text_from_html = ' '.join(texts)                   
    except Exception as e:
        print(e)

    h = html2text.HTML2Text()                 
    h.ignore_links = True                     
    try:
        text = h.handle(html_code)            
        text_from_html=text.replace("\n"," ") 
    except Exception as e:
        print(e)
    intersect.append(set(res).intersection(text_from_html))