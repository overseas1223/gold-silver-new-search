from bs4 import BeautifulSoup
import requests

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
}

def financial_times():
    data = []
    url = "https://www.ft.com/gold"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    li_tags = soup.find_all('li', class_=['o-teaser-collection__item', 'o-grid-row'])
    for li_tag in li_tags:
        link = None
        date = None
        poster = None
        title = None
        description = None
        image = None
        prev_date = None

        time_tag = li_tag.find("time", class_="o-date")
        if time_tag is not None:
            date = time_tag["datetime"]
            prev_date = date
        else:
            print("Time tag not found.")
        
        poster_tag = li_tag.find("a", class_="o-teaser__tag")
        if poster_tag is not None:
            poster = poster_tag.text
        else:
            print("Poster tag not found.")

        header_tag = li_tag.find("a", class_="js-teaser-heading-link")
        if header_tag is not None:
            title = header_tag.text
            link = "https://www.ft.com" + header_tag["href"]
        else:
            print("Header tag not found.")

        description_tag = li_tag.find("a", class_="js-teaser-standfirst-link")
        if description_tag is not None:
            description = description_tag.text
        else:
            print("Description tag not found.")

        image_tag = li_tag.find("img", class_=["o-teaser__image", "o-lazy-load"])
        if image_tag is not None:
            image = image_tag["data-src"]
        else:
            print("Image tag not found.")

        if poster is not None and title is not None:
            if date is None and prev_date is not None:
                date = prev_date
                
            data.append({
                "title": title,
                "link": link,
                "author": poster,
                "date": date,
                "image": image,
                "description": description
            })

    return data

def gold_playbook():
    data = []
    url = "https://www.goldplaybook.com/"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    container_tag = soup.find("div", class_="order-last")
    news_tags = container_tag.find_all("div", class_="transparent")
    for news_tag in news_tags:
        link = None
        date = None
        poster = None
        title = None
        description = None
        image = None

        a_tag = news_tag.find("a")
        if a_tag is not None:
            link = "https://www.goldplaybook.com" + a_tag["href"]
        else:
            print("Link tag not found.")
        
        img_tag = news_tag.find("img")
        if img_tag is not None:
            image = img_tag["src"]
        else:
            print("Image tag not found.")

        time_tag = news_tag.find("time")
        if time_tag is not None:
            date = time_tag["datetime"]
        else:
            print("Time tag not found.")

        h2_tag = news_tag.find("h2")
        if h2_tag is not None:
            title = h2_tag.text
            description_tag = h2_tag.find_next("p")
            if description_tag is not None:
                description = description_tag.text
        else:
            print("Title tag not found.")

        data.append({
            "title": title,
            "link": link,
            "author": poster,
            "date": date,
            "image": image,
            "description": description
        })
        
    return data

class Scrape:
    def __init__(self, type):
        self.type = type

    def scrape_data(self):
        data = []
        try:
            if self.type == "financial_times":            
                data = financial_times()
            elif self.type == "gold_playbook":
                data = gold_playbook()

            return True, data
        except Exception as err:
            print("An error occurred:", err)
            return False, None