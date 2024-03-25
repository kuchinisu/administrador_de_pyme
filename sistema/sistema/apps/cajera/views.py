from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

import json
import datetime
import os
import requests


from .models import HistorialDeVentas, ProductoVendido

from sistema.apps.rh.models import Socios
from sistema.apps.inventario.models import (Producto, ProductoTipo, Categoria, 
                                                    Marca, 
                                                    )
from sistema.apps.inventario.serializers import (ProductoSerializer, MarcaSerializer, 
                                                         CategoriaSerializer,ProductoTipoSerializer
                                                         )
from sistema.apps.finanzas.models import (Caja, 
                                                  CategoriaPasivosFijos, PasivosFijos, 
                                                  CajaFuerte
                                                  )
from sistema.apps.finanzas.serializers import CajaSerializer

from sistema.apps.utils.pagination import *

#Large

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
