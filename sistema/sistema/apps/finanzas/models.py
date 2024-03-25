from django.db import models

import datetime


class CajaFuerte(models.Model):
    nombre = models.CharField(default="cajafuerte", max_length=11)
    dinero = models.DecimalField(max_digits=10, decimal_places=2)
    destinado = models.DecimalField(max_digits=5, decimal_places=2)
    def __str__(self):
        return str(self.nombre)

class Caja(models.Model):
    nombre = models.CharField(default = "A", max_length=50)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_neta = models.DecimalField(default = 0, max_digits=10, decimal_places=2)
    
    def __str__(self):
        return str(self.nombre)
    

class CategoriaPasivosFijos(models.Model):
    nombre = models.CharField(default=" ", max_length=50)
    destinado = models.IntegerField(default=30)

    def __str__(self):
        return str(self.nombre)
    
class PasivosFijos(models.Model):
    nombre = models.CharField(default = "", max_length=50)
    meta = models.DecimalField(max_digits=10, decimal_places=2)
    acumulado = models.DecimalField(max_digits = 10, decimal_places = 2)

    cada_cuanto = models.IntegerField(default = 0)
    a_partir = models.DateTimeField()
    
    destinado = models.DecimalField(max_digits=5, decimal_places=2)

    categoria = models.ForeignKey(CategoriaPasivosFijos, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.nombre)
    
class GananciasNetasPorDia(models.Model):
    fecha = models.DateField(default=datetime.date.today())
    ganancias_netas_totales = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)

    def __str__(self):
        return str(f'ganancias del dia: {self.fecha}')