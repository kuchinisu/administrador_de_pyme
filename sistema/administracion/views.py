from django.shortcuts import render, get_object_or_404

import requests
from reportlab.pdfgen import canvas
import datetime
import os
import json


from .models import (Producto, ProductoTipo, Categoria, Caja, CategoriaPasivosFijos, 
                     PasivosFijos, Socios, CajaFuerte, HistorialDeVentas, ProductoVendido,
                     GananciasNetasPorDia, Marca, Empleade, Areas)

from .serializers import (ProductoSerializer, ProductoTipoSerializer, 
                          CategoriaSerializer, CajaSerializer, SociosSerializer,
                          GananciasNetasPorDiaSerializer, EmpleadeSerializer, AreasSerializer)

from .pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, permissions

 




class VistaCajera(APIView):
    def get(self, request, format=None):
        if Producto.objects.all().exists():
            productos = Producto.objects.all()

            paginator = SmallSetPagination()

            results = paginator.paginate_queryset(productos, request)
            serializer = ProductoSerializer(results, many=True)

            return paginator.get_paginated_response({'productos':serializer.data})

        else:
            return Response({'error': 'No encontrado'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 

    

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

