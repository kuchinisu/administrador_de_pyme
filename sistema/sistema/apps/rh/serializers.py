from rest_framework import serializers
from .models import Socios, Areas, Empleade

class SociosSerializer(serializers.ModelSerializer):
    foto=serializers.CharField(source='get_imagen')
    class Meta:
        model=Socios
        fields=[
            'nombre',
            'dinero',
            'foto',
            'porcentaje_correspondido'
        ]

class AreasSerializer(serializers.ModelSerializer):
    class Meta:
        model=Areas
        fields=[
            'nombre',
        ]

class EmpleadeSerializer(serializers.ModelSerializer):
    area = serializers.CharField(source='get_area')
    class Meta:
        area=AreasSerializer()
        model = Empleade
        fields=[
            'nombre',
            'edad',
            'sexo',
            'cumple',
            'fecha_entrada',
            'dias_trabajados',
            'puesto',
            'salario',
            'codigo',
            'area',
        ]
