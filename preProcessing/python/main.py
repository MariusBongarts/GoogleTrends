from models.keyword import Keyword
from db import DB

db = DB("myDB", "keywords");

db.findAll()