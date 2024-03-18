from rest_framework import serializers

from .models import (Socios, Empleade, CajaFuerte, CategoriaPasivosFijos,
                     PasivosFijos,Categoria,Marca,ProductoTipo,Producto, Merma, Caja, 
                     GananciasNetasPorDia)

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


class EmpleadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleade
        fields=[
            'nombre',
            'edad',
            'cumple',
            'fecha_entrada',
            'dias_trabajados',
            'puesto',
            'salario'
        ]

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

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields=[
            'nombre'
        ]

class MarcaSerializer(serializers.ModelSerializer):
    imagen = serializers.CharField(source='get_imagen')
    class Meta:
        model=Marca
        fields=[
            'nombre',
            'imagen'
        ]

class ProductoTipoSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(source='get_imagen')

    class Meta:  
        model = ProductoTipo
        fields = [ 
            'nombre',
            'descripcion',
            'imagen',
            'precio',
            'costo',
            'perecedero',
            'mod_inventario'
        ]

class ProductoSerializer(serializers.ModelSerializer):
    producto = ProductoTipo()
    categoria = CategoriaSerializer()
    marca = MarcaSerializer()
    class Meta:
        model=Producto
        fields=[
            
            'codigo',
            'producto',
            'fecha_de_caducidad',
            'categoria',
            'marca'
        ]

class MermaSerializer(serializers.ModelSerializer):
    imagen=serializers.CharField(source='get_imagen')
    class Meta:
        model=Merma
        fields=[
            'nombre',
            'descripcion',
            'precio',
            'costo',
            'imagen',
            'codigo',
            'categoria',
            'marca'
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

