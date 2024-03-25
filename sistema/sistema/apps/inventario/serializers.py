from rest_framework import serializers

from .models import (Categoria, Marca, Merma, Producto, ProductoTipo)


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
    categoria = serializers.CharField(source='get_categoria_str')
    marca = serializers.CharField(source='get_marca_str')
    class Meta:  
        model = ProductoTipo
        fields = [ 
            'nombre',
            'descripcion',
            'imagen',
            'precio',
            'costo',
            'perecedero',
            'mod_inventario',
            'categoria',
            'marca',
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
