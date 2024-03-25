from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view



from apps.utils.pagination import LargeSetPagination, MediumSetPagination, SmallSetPagination

from .serializers import (CategoriaSerializer, MarcaSerializer, ProductoSerializer, ProductoTipoSerializer)
from .models import (Categoria, Marca, Producto, ProductoTipo)


       
class ProductoDetailView(APIView):
    def get(self, request, codigo, format=None):
        producto = get_object_or_404(Producto, codigo=codigo)
        serializer = ProductoSerializer
        return Response({'producto':serializer.data}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListaCategorias(APIView):
    def get(self, request, format=None):
        if Categoria.objects.all().exists():
            categrias = Categoria.objects.all()
            result=[]
            for categoria in categrias:
                if not categoria.parent:
                    item = {}
                    item['nombre'] = categoria.nombre

                    for cat in categoria:
                        sub_item={}
                        if cat.parent and cat.parent.id == categoria.nombre:
                            sub_item['nombre'] = cat.nombre

                            item['sub_categoria'].append(sub_item)
                    
                result.append(item)


            return Response({'categorias': 'result'}, status=status.HTTP_200_OK)
        
        else:
            return Response({'error': 'categorias no econtradas'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class InventarioView(APIView):
    def get(self, request, format=None):
        
        if Categoria.objects.all().exists():
            categorias = Categoria.objects.all()

        else:
            return Response({"error":"no hay categorias en la base de datos"}, status=status.HTTP_404_NOT_FOUND)
        
        if Marca.objects.all().exists():
            marcas = Marca.objects.all()
        else:
            return Response({"error":"no hay marcas en la base de datos"},status=status.HTTP_404_NOT_FOUND)
        
        if ProductoTipo.objects.all().exists():
            productos_t = ProductoTipo.objects.all()
        else:
            return Response({"error":"no hay productos en la base de datos"}, status=status.HTTP_404_NOT_FOUND)
        
        if Producto.objects.all().exists():
            productos = Producto.objects.all()


        respuestas = []
        indice=0
        for categoria in categorias:
            respuesta = {}
            respuesta[str(categoria.nombre)]={}
            for marca in marcas:
                if productos_t.filter(categoria=categoria, marca=marca).exists():
                    respuesta[str(categoria.nombre)][str(marca.nombre)]={}
                    for producto_t in productos_t.filter(categoria=categoria, marca=marca):
                        respuesta[str(categoria.nombre)][str(marca.nombre)][str(producto_t.nombre)] = []
                        
                        productoData = {
                            "nombre":str(producto_t.nombre),
                            "descripcion":str(producto_t.descripcion),
                            "imagen":producto_t.imagen.url,
                            "precio":float(producto_t.precio),
                            "costo":float(producto_t.costo),
                            "perecedero": producto_t.perecedero,
                            "modo_inventario":str(producto_t.mod_inventario),
                            "categoria":str(producto_t.categoria.nombre),
                            "marca":str(producto_t.marca.nombre),
                            "unidades":[

                            ]

                            }

                        for unidad in productos.filter(producto=producto_t):
                            productoData["unidades"].append(unidad.codigo)

                        respuesta[str(categoria.nombre)][str(marca.nombre)][str(producto_t.nombre)] = productoData
            respuestas.append(respuesta)

        paginator = LargeSetPagination()

        return Response({"resultados":respuestas}, status=status.HTTP_200_OK)
        
class ProductosDeMarcaUnidades(APIView):
    def get(self, request, categoria, marca, producto ,format=None):

        if Marca.objects.filter(nombre=marca).exists():
            marca_obj = Marca.objects.get(nombre=marca)

            categoria = categoria.replace("/", "")
            categoria = categoria.replace('"', "")

            categoria_obj=Categoria.objects.filter(nombre=categoria).first()
            
            print(categoria_obj)
            
            productos = ProductoTipo.objects.filter(marca=marca_obj, categoria=categoria_obj, nombre=producto).order_by('nombre')

            unidades = []

            for producto in productos:
                unidad = {}
                product = Producto.objects.filter(producto=producto)
                nombre = str(producto.nombre)
                #unidad[nombre] = {}
                unidadData = {
                    "codigos":[],
                    "perecedero":producto.perecedero,
                    "fechas_caducidad":[],
                }
                for uni in product:
                    unidadData["codigos"].append(uni.codigo)
                    unidadData["fechas_caducidad"].append(uni.fecha_de_caducidad)
                unidad[nombre]=unidadData
                unidades.append(unidad)        
            
            return Response({"respuesta": unidades}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "La marca especificada no existe"}, status=404)
        
class ProductosDeMarca(APIView):
    def get(self, request, categoria, marca, format=None):

        if Marca.objects.filter(nombre=marca).exists():
            marca_obj = Marca.objects.get(nombre=marca)
            categoria = categoria.replace("/", "")
            categoria = categoria.replace('"', "")

            categoria_obj=Categoria.objects.filter(nombre=categoria).first()
            
            print(categoria_obj)
            
            productos = ProductoTipo.objects.filter(marca=marca_obj, categoria=categoria_obj).order_by('nombre')
            paginator = SmallSetPagination()

            results = paginator.paginate_queryset(productos, request)
            serializer = ProductoTipoSerializer(results, many=True)

            return paginator.get_paginated_response({'productos': serializer.data})

                           
        else:
            return Response({"error": "La marca especificada no existe"}, status=404)


@api_view(['POST'])
def add_unidad(request):
    data = request.data
    print(data)

    categoria_n = data["categoria"]
    codigo = data["codigo"]
    numero = codigo
    numero + " "
    numero = numero.replace(" ","")
    numero = int(numero)
    marca_n = data["marca"]
    producto = data["producto"]
    
    if ProductoTipo.objects.all().exists():
        categoria = Categoria.objects.filter(nombre=categoria_n).first()
        marca = Marca.objects.filter(nombre=marca_n).first()
        if ProductoTipo.objects.filter(nombre=producto, categoria=categoria, marca=marca).exists():        
            producto = ProductoTipo.objects.filter(nombre=producto, categoria=categoria, marca=marca).first()

            if not Producto.objects.filter(producto=producto, codigo=numero).exists():
                unidad = Producto(producto=producto, codigo=numero)
                unidad.save()
                
                return Response({"exitoso":"unidad añadida"}, status=status.HTTP_200_OK)
            else:
                return Response({"no autorizo":"la unidad del producto que intenta agregar ya existe"}, status=status.HTTP_409_CONFLICT)
        else:
            return Response({"error":"no existe el producto especificado"},status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({"error":"no existen productos en la base de datos"})


@api_view(['POST'])
def add_categoria(request):
    data = request.data
    categoria_name = data["categoria"]

    try: 
        if not Categoria.objects.filter(nombre=categoria_name):
            categoria = Categoria(nombre=categoria_name)
            categoria.save()
            
            return Response({"exito":"categoria añadida de manera exitosa"}, status=status.HTTP_200_OK)

        else:
            return Response({"no autorizo":"la categoria especificada ya existe"}, status=status.HTTP_409_CONFLICT)
    except Exception as e:
        return Response({"error":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  

@api_view(['POST'])
def add_marca(request):
    try:
        data = request.data
        marca = data["marca"]
        imagen = data["imagen"]

        if not Marca.objects.filter(nombre=marca).exists():
            marca = Marca(nombre=marca, imagen=imagen)
            marca.save()

            return Response({"exito":"la marca se a añadido con exito"}, status=status.HTTP_200_OK)
        else:
            return Response({"no autorizo": "la marca especificada ya existe"}, status=status.HTTP_409_CONFLICT)
    except Exception as e:
        return Response({"error":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def add_producto(request):
    data = request.data

    nombre = data["nombre"]
    descripcion = data["descripcion"]
    imagen = data["imagen"]
    precio = float(data["precio"])
    costo = float(data["costo"])
    perecedero = data["perecedero"]
    categoria_n = data["categoria"]
    marca_n = data["marca"]
   

    if Marca.objects.filter(nombre=marca_n).first():
        marca = Marca.objects.filter(nombre=marca_n).first()
    else:
        marca = Marca(nombre=marca_n)
        marca.save()

    if Categoria.objects.filter(nombre=categoria_n).exists():
        categoria = Categoria.objects.filter(nombre=categoria_n).first()
    else:
        categoria = Categoria(nombre=categoria_n)
        categoria.save()

    if not ProductoTipo.objects.filter(nombre=nombre, marca=marca, categoria=categoria).exists():
        producto = ProductoTipo(nombre=nombre,
                                descripcion=descripcion,
                                imagen=imagen,
                                precio=precio,
                                costo=costo,
                                marca=marca, 
                                categoria=categoria)

        producto.save()

        return Response({"exito":"el tipo de producto se a añadido con exito"}, status=status.HTTP_200_OK)
    else:
        return Response({"no autorizo": "el producto especificada ya existe"}, status=status.HTTP_409_CONFLICT)

 