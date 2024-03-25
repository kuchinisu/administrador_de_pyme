from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

import requests
from reportlab.pdfgen import canvas
import datetime
import os
import json

from .serializers import CajaFuerteSerializer, GananciasNetasPorDiaSerializer
from sistema.apps.utils.pagination import LargeSetPagination, MediumSetPagination, SmallSetPagination
from .models import (CategoriaPasivosFijos, PasivosFijos, GananciasNetasPorDia)


@api_view(['POST'])
def tabla_de_pasivos(request):
        data = request.data
        metodo = data["metodo"]
        base_dir = "sistema/static/json/"
        if metodo == "mensual":
            years = os.listdir(f'{base_dir}')
            years = sorted(years)
            meses = os.listdir(f'{base_dir}{years[-1]}')
            
            archivos = os.listdir(f'{base_dir}{years[-1]}/{meses[-1]}')

            archivos = sorted(archivos)
            
            tabla_total = {}
            for arch in archivos:
                with open(f'{base_dir}{years[-1]}/{meses[-1]}/{arch}') as f:
                    tabla = json.load(f)

                    for key, value in tabla.items():
                        if not type(value) is dict:
                            if not key in tabla_total:
                                tabla_total[key] = 0
                            tabla_total[key] += value  

                        else:
                            for subkey, subvalue in value.items():
                                if type(subvalue) is not dict:
                                    if key not in tabla_total:
                                        tabla_total[key] = {}
                                    if subkey not in tabla_total[key]:
                                        tabla_total[key][subkey]=0
                                    tabla_total[key][subkey] += subvalue
                                else:
                                    for skey, svalue in subvalue.items():
                                        if key not in tabla_total:
                                            tabla_total[key]={}
                                        if subkey not in tabla_total[key]:
                                            tabla_total[key][subkey] = {}
                                        if skey not in tabla_total[key][subkey]:
                                            tabla_total[key][subkey][skey] = 0
                                        tabla_total[key][subkey][skey] += svalue
                                    
                                
        
        return Response(tabla_total,status=status.HTTP_200_OK)


class GananciasNetasPorDiaView(APIView):
    def get(self, request, format=None):
        if GananciasNetasPorDia.objects.all().exists():
            ganancias = GananciasNetasPorDia.objects.all()
            
            paginator = LargeSetPagination()

            results = paginator.paginate_queryset(ganancias, request)
            serializer = GananciasNetasPorDiaSerializer(results, many=True)
        return paginator.get_paginated_response({'ganancias_netas':serializer.data})  