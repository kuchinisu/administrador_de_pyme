from rest_framework import serializers

from .models import CajaFuerte, CategoriaPasivosFijos, Caja, PasivosFijos, GananciasNetasPorDia


class CajaFuerteSerializer(serializers.ModelSerializer):
    class Meta:
        model=CajaFuerte
        fields = [
            'nombre',
            'dinero',
            'destinado'
        ]

class CategoriaPasivosFijosSerializer(serializers.ModelSerializer):
    class Meta:
        model=CategoriaPasivosFijos
        fields = [
            'nombre'
        ]

class PasivosFijosSerializer(serializers.ModelSerializer):
    categoria = CategoriaPasivosFijosSerializer()
    class Meta:
        model = PasivosFijos
        fields = [
            'nombre',
            'meta',
            'acumulado',
            'cada_cuanto',
            'a_partir',
            'destinado',
            'categoria'
        ]

class CajaSerializer(serializers.ModelSerializer):
    class Meta: 
        model=Caja
        fields=[
            'nombre',
            'cantidad',
            'cantidad_neta',
        ]

class GananciasNetasPorDiaSerializer(serializers.ModelSerializer):
    class Meta:
        model=GananciasNetasPorDia
        fields = [
            'fecha',
            'ganancias_netas_totales',
        ]

