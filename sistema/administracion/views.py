from django.shortcuts import render, get_object_or_404

import requests
from reportlab.pdfgen import canvas
import datetime
import os
import json


from .models import (Producto, ProductoTipo, Categoria, Caja, CategoriaPasivosFijos, 
                     PasivosFijos, Socios, CajaFuerte, HistorialDeVentas, ProductoVendido,
                     GananciasNetasPorDia, Marca)

from .serializers import (ProductoSerializer, ProductoTipoSerializer, 
                          CategoriaSerializer, CajaSerializer, SociosSerializer,
                          GananciasNetasPorDiaSerializer)

from .pagination import SmallSetPagination, MediumSetPagination, LargeSetPagination

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, permissions

class VistaCajera2(APIView):
    def get(self, request, format=None):
        print( f"fecha actual según python {datetime.date.today()}")#type(datetime.datetime.now())
        historial_ventas = HistorialDeVentas.objects.last()
        

        if ProductoTipo.objects.all().exists():
            productos = ProductoTipo.objects.all().order_by('nombre')

            paginator = SmallSetPagination()

            results = paginator.paginate_queryset(productos, request)
            serializer = ProductoTipoSerializer(results, many=True)

            return paginator.get_paginated_response({'productos': serializer.data})

        else:
            return Response({'error': 'No encontrado'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
                        for unidad in productos.filter(producto=producto_t):
                            respuesta[str(categoria.nombre)][str(marca.nombre)][str(producto_t.nombre)].append(int(unidad.codigo))
            respuestas.append(respuesta)

        paginator = LargeSetPagination()

        return Response({"resultados":respuestas}, status=status.HTTP_200_OK)
        
class ProductosDeMarca(APIView):
    def get(self, request, categoria, marca,  format=None):

        if Marca.objects.filter(nombre=marca).exists():
            marca_obj = Marca.objects.get(nombre=marca)

            categoria = categoria.replace("/", "")
            categoria = categoria.replace('"', "")

            categoria_obj=Categoria.objects.filter(nombre=categoria).first()
            
            print(categoria_obj)
            
            productos = ProductoTipo.objects.filter(marca=marca_obj, categoria=categoria_obj).order_by('nombre')

            unidades = []

            for producto in productos:
                unidad = {}
                product = Producto.objects.filter(producto=producto)
                nombre = str(producto.nombre)
                unidad[nombre] = []

                for uni in product:
                    unidad[nombre].append(uni.codigo)
                unidades.append(unidad)        
            
            return Response({"respuesta": unidades}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "La marca especificada no existe"}, status=404)

class CajaView(APIView):
    def get(self, request, format=None):
        if Caja.objects.all().exists():
            caja = Caja.objects.all()
            paginator = SmallSetPagination()
            results = paginator.paginate_queryset(caja, request)
            serializer = CajaSerializer(results, many=True)

            return paginator.get_paginated_response({'cajas': serializer.data})
        else:
            return Response({'error': 'no hay cajas encontradas'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def realizar_pago(request):
    hoy_dia = datetime.date.today()

    if HistorialDeVentas.objects.filter(fecha = hoy_dia).exists():
        historial_de_ventas = HistorialDeVentas.objects.filter(fecha = hoy_dia).first()
    else:
        historial_de_ventas = HistorialDeVentas(fecha = hoy_dia)
        historial_de_ventas.save()

    
    print(f'el request: {request.data}')
    if Caja.objects.all().exists():
        caja = Caja.objects.first()
        for key, value in request.data.items():
            for val in value:
                
                tipo = ProductoTipo.objects.filter(nombre=key).first()
                producto = Producto.objects.filter(codigo = val, producto = tipo).first()

                if not producto:
                    print("El producto no existe.")
                elif not tipo:
                    print("no existe el tipo")

                else:
                    precio = tipo.precio
                    costo = tipo.costo
                    ganancia = precio - costo

                    caja.cantidad += ganancia + costo
                    caja.cantidad_neta = ganancia
                    caja.save()

                    if ProductoVendido.objects.filter(del_dia = historial_de_ventas).exists():
                        ultimo_vendido = ProductoVendido.objects.last().numero_de_venta + 1
                    else:
                        ultimo_vendido = 1

                    producto_vendido = ProductoVendido(
                                                        del_dia=historial_de_ventas, 
                                                        tipo_de_producto=tipo,
                                                        hora_de_venta = datetime.datetime.now(),
                                                        codigo = producto.codigo,
                                                        numero_de_venta = ultimo_vendido,
                                                    )
                    producto_vendido.save()


                    producto.delete()

                    datos = {
                        "nombre": "Rodolfo Escamilla",
                        "correo": "rodolfoescamilla2011@hotmail.com",
                        "codigo": 0,
                        "password":"ee",
                        "productoT":str(tipo.nombre),
                        "producto_c": producto.codigo
                    }
                    try:
                        url="http://127.0.0.1:8001/inventario/eliminar_articulo/"
                        respuesta = requests.post(url, json=datos)
                        print(respuesta)
                    except Exception as e:
                        return Response({"error":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    return Response(request.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def realizar_corte(request):
    #tiket = canvas.Canvas("tiket")
    documento = ""
    _json={}

    caja = Caja.objects.first()
    cat_pasivos_fijos = CategoriaPasivosFijos.objects.all()

    repartido_total = 0

    ganancia = caja.cantidad_neta
    coste = caja.cantidad
    bruta = ganancia + coste
    _json["GananciasBrutas"] = float(bruta)

    documento += f'Ganancias Brutas: {coste+ganancia}\n'
    documento += f'Para pago de mercancias {coste}\n'
    _json["pagoDeMercancias"] = float(coste)
    documento += f'para crecimiento de la mercancia: {1}\n'
    _json["destinadoACrecimiento"] = 1
    documento += '\n\n'

    hoy_dia = datetime.date.today()

    if HistorialDeVentas.objects.filter(fecha=hoy_dia).exists():
        historial_dia = HistorialDeVentas.objects.filter(fecha=hoy_dia).first()
        vendidos = ProductoVendido.objects.filter(del_dia=historial_dia)
        
        #if vendidos.exists():
            #for vendido in vendidos:
                #tiket.drawString(10, 760, f'vendido: ${vendido.tipo_de_producto.nombre["ganancias_netas"]}')


    para_salarios = ((ganancia * 10) / 100)
    _json["salarios"] = float(para_salarios)
    ganancia -= para_salarios

    documento += f'Salarios: {para_salarios}\n'
    _json["pasivosFijos"]={}
    documento += f'Pago de pasivos fijos:\n'
    para_servicios = {}
    for cat_pas in cat_pasivos_fijos:
        destinado =  ((cat_pas.destinado * ganancia) / 100)
        repartido_total += destinado
        documento += f'-{cat_pas.nombre}: ${destinado} = {cat_pas.destinado}%\n'
        cat_pas_nombre = str(cat_pas.nombre)
        _json["pasivosFijos"][cat_pas_nombre] = {}
        pasivos_fijos = PasivosFijos.objects.filter(categoria=cat_pas)
        if pasivos_fijos.exists():
            gastado = 0
            for pasivo in pasivos_fijos:
                destinado_a_pasivo = ((pasivo.destinado * destinado) / 100)
                gastado += destinado_a_pasivo
                pasivo.acumulado += destinado_a_pasivo
                pasivo.acumulado
                pasivo_nombre = str(pasivo.nombre)
                documento += f'--{pasivo_nombre}: ${destinado_a_pasivo}\n'
                _json["pasivosFijos"][cat_pas_nombre][pasivo_nombre]=float(destinado_a_pasivo)
            destinado -= gastado
    
    caja_fuerte = CajaFuerte.objects.first()
    a_caja_fuerte = ((caja_fuerte.destinado * ganancia) / 100)
    _json["aCajaFuerte"] = float(a_caja_fuerte)
    caja_fuerte.dinero += a_caja_fuerte
    repartido_total += a_caja_fuerte
    caja_fuerte.save()

    documento += f'Para caja fuerte: ${a_caja_fuerte}\n'


    ganancia -= repartido_total
    _json["gananciasNetas"] = float(ganancia)
    documento += f'Ganancias netas: {ganancia}\n'
    socios = Socios.objects.all()
    documento += f'Reparticion a los socios: \n'
    if socios.exists():
        _json["reparticionASocios"]={}
        gastado = 0
        for socio in socios:
                porcentaje = ((socio.porcentaje_correspondido * ganancia) / 100)
                documento += f'-socio {socio.nombre}:\n  --porsentaje correspondiente: {socio.porcentaje_correspondido}%-${porcentaje}\n'

                gastado += porcentaje
                socio.dinero += porcentaje
                socio.save()
                _json["reparticionASocios"][str(socio.nombre)] = float(porcentaje)

    ganancia -= gastado

    caja.cantidad_neta = ganancia
    caja.cantidad = 0
    caja.save()

    with open('sistema/static/docs/documento.txt', 'w') as f:
        f.write(documento)

    directorio = 'sistema/static/json/'

    nombre_carpeta_year = f'{hoy_dia.year}'
    nombre_carpeta_mes = f'{hoy_dia.month}'
    archivo_n = f'{hoy_dia.day}.json'

    ruta_carpeta = os.path.join(directorio, nombre_carpeta_year, nombre_carpeta_mes)

    try:
        os.makedirs(ruta_carpeta, exist_ok=True)
        print(f"La carpeta '{nombre_carpeta_year}/{nombre_carpeta_mes}' ha sido creada en '{directorio}'.")
    except OSError as e:
        print(f"Error al crear la carpeta: {e}")

    ruta_archivo = os.path.join(ruta_carpeta, archivo_n)
    try:
        with open(ruta_archivo, 'w') as f:
            json.dump(_json,f)
            print(f"Archivo '{archivo_n}' creado en '{ruta_carpeta}'.")
    except Exception as e:
        print(f"Error al escribir el archivo JSON: {e}")

    print(f'\n\njson generado: {_json}\nnn')

    return Response({"proceso":"exito"}, status=status.HTTP_200_OK)


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
        


class SociosVista(APIView):
    def get(self, request, format=None):
        if Socios.objects.all().exists():
            socios = Socios.objects.all()
            
            paginator = SmallSetPagination()

            results = paginator.paginate_queryset(socios, request)
            serializer = SociosSerializer(results, many=True)

        return paginator.get_paginated_response({'socios':serializer.data})
    
class GananciasNetasPorDiaView(APIView):
    def get(self, request, format=None):
        if GananciasNetasPorDia.objects.all().exists():
            ganancias = GananciasNetasPorDia.objects.all()
            
            paginator = LargeSetPagination()

            results = paginator.paginate_queryset(ganancias, request)
            serializer = GananciasNetasPorDiaSerializer(results, many=True)
        return paginator.get_paginated_response({'ganancias_netas':serializer.data})
    

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

