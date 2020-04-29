import sqlite3
import pandas as pd
import numpy as np
import time

# Abrimos el archivo, suponemos que es cvs y obtenemos un dataframe
datos 		= pd.read_csv("vectores.csv", sep=",", index_col = 0)
print(type(datos)) # imprimimos el tipo de datos, en este caso sera dataFrame

imprimir1 = "let paises = [ \n"
for index, row in datos.iterrows():
    array = np.asarray(row)
    imprimir1 +="\""+index+"\","
imprimir1 +=" ]\n"
datosjs = open("paises.js","w")
datosjs.write(imprimir1)
datosjs.close()
