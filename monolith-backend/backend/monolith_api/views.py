from rest_framework import generics, permissions
from .serializers import ProductSerializer, UserSerializer, CreateOrderSerializer, RetrieveOrderSerializer
from monolith_api.models import Product, Order
from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser


class Profile(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class AllProductList(generics.ListAPIView):

    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):

        return Product.objects.all()


class ListingList(generics.ListCreateAPIView):

    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]


    def get_queryset(self):

        return Product.objects.filter(user=self.request.user)
        
    def perform_create(self, serializer):

        serializer.save(user=self.request.user)


class ProductDetail(generics.RetrieveAPIView):

    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'

    def get_queryset(self):

        return Product.objects.all()

class OrderList(generics.ListCreateAPIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):

        if self.request.method == 'GET':
            return RetrieveOrderSerializer
        return CreateOrderSerializer

    def get_queryset(self):

        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):

        serializer.save(user=self.request.user)
