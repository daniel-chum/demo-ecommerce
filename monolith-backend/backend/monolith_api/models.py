from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):

    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    image = models.ImageField(upload_to='products/', default='lebron-dunk.jpg')


class Order(models.Model):

    order_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='orders')
    product = models.ManyToManyField(Product,  related_name='orders')
