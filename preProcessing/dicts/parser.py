# -*- coding: iso-8859-1 -*-
import os

########################################################################
# Main
########################################################################
def Main():
	ReplaceSZ()
	Muesli()

def ReplaceSZ():

	inp = open(os.path.normpath('german.dic'), 'r')
	out1 = open(os.path.normpath('de_DE-only.dic'), 'w')
	out2 = open(os.path.normpath('de_CH-only.dic'), 'w')
	out3 = open(os.path.normpath('de.dic'), 'w')

	lines = inp.readlines()
	inp.close()

	stringArray1 = []
	stringArray2 = []
	stringArray3 = []
	counter = -1
	for line in lines:
		counter += 1
		g = line.find('ß')
		if g >= 0:
			stringArray1.append( line )
			if (counter-1 < 0 or counter+1 >= len(lines)):
				stringArray2.append( line.replace('\xdf', 'ss') )
				continue
			if not ( line.replace('\xdf', 'ss') == lines[counter-1] or line.replace('\xdf', 'ss') == lines[counter+1] ):
				stringArray2.append( line.replace('\xdf', 'ss') )
		else:
			stringArray3.append( line )

	if len(stringArray1) > 0:
		for string in stringArray1:
			out1.write(string)
	out1.close()

	if len(stringArray2) > 0:
		for string in stringArray2:
			out2.write(string)
	out2.close()

	if len(stringArray3) > 0:
		for string in stringArray3:
			out3.write(string)
	out3.close()

# TODO: Efizienter machen, nicht zwei Durchgänge mit derselben Datei
def Muesli():

	inp = open(os.path.normpath('de.dic'), 'r')
	out1 = open(os.path.normpath('de_DE-only.dic'), 'a')
	out2 = open(os.path.normpath('de_CH-only.dic'), 'a')
	lines = inp.readlines()
	inp.close()
	out3 = open(os.path.normpath('de.dic'), 'w')

	stringArray1 = [] # deutsch
	stringArray2 = [] # CH
	stringArray3 = [] # allg.
	counter = -1
	for line in lines:
		g = line.find('müsli')
		if g >= 0:
			stringArray1.append( line )
			stringArray2.append( line.replace('müsli', 'müesli') )
		elif line.find('Müsli') >= 0:
			stringArray1.append( line )
			stringArray2.append( line.replace('Müsli', 'Müesli') )
		elif line.find('Handy') >= 0:
			stringArray3.append( line )
			stringArray2.append( line.replace('Handy', 'Natel') )
		else:
			stringArray3.append( line )

	if len(stringArray1) > 0:
		for string in stringArray1:
			out1.write(string)
	out1.close()

	if len(stringArray2) > 0:
		for string in stringArray2:
			out2.write(string)
	out2.close()

	if len(stringArray3) > 0:
		for string in stringArray3:
			out3.write(string)
	out3.close()


########################################################################
# run it
########################################################################
Main()