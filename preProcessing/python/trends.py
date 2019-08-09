from pytrends.request import TrendReq

pytrends = TrendReq(hl='en-US', tz=360)

kw_list = ["Trump"]

test = pytrends.get_historical_interest(kw_list,
year_start=2019,
month_start=8,
day_start=7,
hour_start=0,
year_end=2019,
month_end=8,
day_end=8,
hour_end=0,
cat=0, geo='',
gprop='',
sleep=0)

test2 = pytrends.interest_over_time()

print(test2)