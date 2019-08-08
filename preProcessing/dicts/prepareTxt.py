import os
import json

def openFile():
  inp = open(os.path.normpath('germanWords.dic'), 'r')

  lines = inp.readlines()
  inp.close()

  words = []

  

  for line in lines:
    words.append(line)
  
  print(len(words))

  with open('germanWords.json', 'w') as json_file:
    json.dump(words, json_file)

  


openFile()