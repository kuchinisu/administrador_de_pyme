from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, permissions

import datetime
 
from .serializers import (AreasSerializer, SociosSerializer, EmpleadeSerializer)
from apps.utils.pagination import LargeSetPagination, MediumSetPagination, SmallSetPagination
from .models import Areas, Socios, Empleade

class AreasView(APIView):
    def get(self, request, format=None):

        if Areas.objects.all().exists():
            areas = Areas.objects.all().order_by('nombre')

            paginator = LargeSetPagination()

            results = paginator.paginate_queryset(areas, request)
            serializer = AreasSerializer(results, many=True)

            return paginator.get_paginated_response({'areas':serializer.data})
        else:
            return Response({'error':'no existen areas en la base de datos'}, status=status.HTTP_404_NOT_FOUND)

class SociosVista(APIView):
    def get(self, request, format=None):
        if Socios.objects.all().exists():
            socios = Socios.objects.all()
            
            paginator = SmallSetPagination()

            results = paginator.paginate_queryset(socios, request)
            serializer = SociosSerializer(results, many=True)

        return paginator.get_paginated_response({'socios':serializer.data})
    

class EmpleadesView(APIView):
    def get(self, request, format=None):
        if Empleade.objects.all().exists():
            empleades = Empleade.objects.all().order_by('nombre')

            paginator = SmallSetPagination()

            results = paginator.paginate_queryset(empleades, request)
            serializer = EmpleadeSerializer(results, many=True)

            return paginator.get_paginated_response({'empleades': serializer.data})
        else:
            return Response({"error":"no existen empleades en la base de datos"}, status=status.HTTP_404_NOT_FOUND)

class EmpleadeView(APIView):
    def get(self, request, codigo, format=None):
        if Empleade.objects.all().exists():
            if Empleade.objects.filter(codigo=codigo):
                empleade = Empleade.objects.filter(codigo=codigo)
                paginator = SmallSetPagination()

                results = paginator.paginate_queryset(empleade, request)
                serializer = EmpleadeSerializer(results, many=True)

                return paginator.get_paginated_response({'emplead':serializer.data})
            else:
                Response({'error':'la empleada/o especificada no existe'}, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({'error':'no hay empleada/os en la base de datos'}, status=status.HTTP_404_NOT_FOUND)
        

@api_view(['POST'])
def add_empleades(request):
    data = request.data
    
    nombre = data["nombre"]
    edad = int(data["edad"])
    sexo = data["sexo"]
    cumple = datetime.datetime.strptime(data["cumple"], "%Y-%m-%d")
    fecha_de_entrada = datetime.datetime.strptime(data["fecha_de_entrada"], "%Y-%m-%d")
    dias_trabajados = int(data["dias_trabajados"])
    puesto = data["puesto"]
    salario = float(data["salario"])
    codigo = int(data["codigo"])
    area_n = data["area"]

    if not Areas.objects.all().exists():
        return Response({'error':'no hay areas registradas en la base de datos'}, status=status.HTTP_404_NOT_FOUND)
    elif not Areas.objects.filter(nombre=area_n):
        return Response({'error':'no existe el area especificada'}, status=status.HTTP_404_NOT_FOUND)
    else:
        area = Areas.objects.filter(nombre=area_n).first()

    if Empleade.objects.filter(codigo=codigo).exists():
        return Response({"no autorizo":"ya existe un empleado con el codigo de empleado especificado"}, status=status.HTTP_409_CONFLICT)
    else:

        nuevo_empleade = Empleade(
            nombre=nombre,
            edad=edad,
            sexo=sexo,
            cumple=cumple,
            fecha_entrada=fecha_de_entrada,
            dias_trabajados = dias_trabajados,
            puesto=puesto,
            salario=salario,
            codigo=codigo,
            area=area
        )

        nuevo_empleade.save()

        return Response({"exito":"empleade agregado con exito"}, status=status.HTTP_200_OK)
