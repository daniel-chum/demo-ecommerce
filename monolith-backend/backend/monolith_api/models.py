from django.db import models
from django.contrib.auth.models import User


class ImageAlbum(models.Model):
    def default(self):
        return self.images.filter(default=True).first()

    def thumbnails(self):
        return self.images.filter(width__lt=100, length_lt=100)


class Image(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/', default='lebron-dunk.jpg')
    default = models.BooleanField(default=False)
    width = models.FloatField(default=100)
    length = models.FloatField(default=100)
    album = models.ForeignKey(
        ImageAlbum, related_name='images', on_delete=models.CASCADE)


class Product(models.Model):

    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    images = models.OneToOneField(
        ImageAlbum, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Order(models.Model):

    order_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='orders')
    product = models.ManyToManyField(Product,  related_name='orders')
