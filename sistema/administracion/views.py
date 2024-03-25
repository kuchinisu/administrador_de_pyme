from django.shortcuts import render, get_object_or_404

import requests
from reportlab.pdfgen import canvas
import datetime
import os
import json


from rest_framework.decorators import api_view
    

@api_view(['POST'])
def actualizar_db_dshb(request):
    data_p = {
        "nombre": "Rodolfo Escamilla",
        "correo": "rodolfoescamilla2011@hotmail.com",
        "codigo": 0,
        "password":"ee",
    }

    respuesta = requests.post()
    if respuesta.status_code == 200: 
        data = respuesta.json()
    
    return

