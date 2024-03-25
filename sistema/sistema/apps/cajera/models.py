from django.db import models
import datetime


#cajera
class Caja(models.Model):
    nombre = models.CharField(default = "A", max_length=50)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_neta = models.DecimalField(default = 0, max_digits=10, decimal_places=2)
    
    def __str__(self):
        return str(self.nombre)
    

class HistorialDeVentas(models.Model):
    fecha = models.DateField(default=datetime.date.today())

    def __str__(self):
        return str(f"dia de ventas {self.fecha}")


class ProductoVendido(models.Model):
    del_dia = models.ForeignKey(HistorialDeVentas, on_delete=models.CASCADE)
    #tipo_de_producto = models.ForeignKey(ProductoTipo, on_delete=models.CASCADE)
    hora_de_venta = models.DateTimeField(default=datetime.datetime.now())
    codigo = models.IntegerField(default = 0)
    numero_de_venta = models.IntegerField(default = 0)

    def __str__(self):
        return f'{self.tipo_de_producto.nombre} - Código: {self.codigo}'



class GananciasNetasPorDia(models.Model):
    fecha = models.DateField(default=datetime.date.today())
    ganancias_netas_totales = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)

    def __str__(self):
        return str(f'ganancias del dia: {self.fecha}')
    
class Tiket(models.Model):
    fecha = models.DateField(default=datetime.date.today())
    numero_de_tiket = models.IntegerField(default=0)
    cuenta = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    
    def __str__(self):
        return str(f'{self.fecha} numero de tiket: {self.numero_de_tiket} cuenta: {self.cuenta}')

class ProductosEnTikets(models.Model):
    #tipo_de_producto = models.ForeignKey(ProductoTipo, on_delete=models.CASCADE)
    codigo = models.IntegerField(default = 0)
    precio = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)

    en_tiket = models.ForeignKey(Tiket, on_delete=models.CASCADE)
    
    #def __str__(self):
        #return str(f'{self.tipo_de_producto}-{self.codigo}:   {self.precio}')

class Turno(models.Model):
    fecha = models.DateField(default=datetime.date.today())
    
class Corte(models.Model):
    fecha = models.DateField(default=datetime.date.today())
    documento = models.CharField(default=" ", max_length=50)

    def __str__(self):
        return str(f'corte del {self.fecha}') 
        
