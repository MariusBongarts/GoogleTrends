keywords = ["Apple","Microsoft","Amazon","Alphabet","Berkshire Hathaway","Facebook","Alibaba","Tencent Holdings","JPMorgan Chase","Johnson &amp; Johnson","Visa","ExxonMobil","ICBC","Walmart","Bank of America","Nestle","Samsung Electronics","Procter &amp; Gamble","Royal Dutch Shell","Intel","Cisco Systems","Mastercard","Verizon Communications","Walt Disney","AT&amp;T","Chevron","Home Depot","China Constructionank","Nike","Taiwan Semiconductor","Roche Holding","Ping An Insurance Group","Pfizer","Wells Fargo","Boeing","UnitedHealth Group","Coca-Cola","PetroChina","China Mobile","Agriculturalank of China","Comcast","Merck &amp; Co.","Oracle","PepsiCo","Kweichow Moutai","Toyota Motor","Anheuser-Busch InBev","Novartis","HSBC Holdings","Citigroup","Netflix","Unilever","L'Oréal","BP","Total","McDonald's","Bank of China","BHP Group","SAP","Adobe","Philip Morris International","China Merchantsank","Abbott Laboratories","Reliance Industries","Broadcom","3M","PayPal","Union Pacific","IBM","Honeywell International","AIA Group","Salesforce.com","Eli Lilly","United Technologies","Novo Nordisk","Tata Consultancy Services","RBC","AbbVie","China Life Insurance","Accenture","NVIDIA","Medtronic","Softbank","Naspers","Amgen","Texas Instruments","Costco Wholesale","Sinopec","AIRBUS","Thermo Fisher Scientific","TDank Group","Allianz","Sanofi","Altria Group","Saudiasic Industries","Rio Tinto","AstraZeneca","Linde","United Parcel Service","Inditex"]

# Python code to illustrate
# inserting data in MongoDB
from pymongo import MongoClient

class DB:
    def __init__(self, dbName, collection):
      try:
        conn = MongoClient("localhost", 27017)
        print("Connected successfully!!!")
      except:
        print("Could not connect to MongoDB")
      db = conn[dbName]
      collection = db[collection]
      self.collection = collection

    def findAll(self):
        # Printing the data inserted
        cursor = self.collection.find()
        for record in cursor:
            print(record)