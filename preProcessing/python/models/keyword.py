import json

class Keyword:
  def __init__(self, id, keyword, createdAt):
    self.id = id
    self.keyword = keyword
    self.createdAt = createdAt

  def toJSON(self):
    return json.dumps(self, default=lambda o: o.__dict__,
        sort_keys=True, indent=4)

