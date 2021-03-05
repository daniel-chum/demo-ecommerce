from rest_framework import generics, permissions
from .serializers import CreateProductSerializer, RetrieveProductSerializer, UserSerializer, CreateOrderSerializer, RetrieveOrderSerializer
from monolith_api.models import Product, Order
from django.contrib.auth.models import User


class Profile(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class HomePageProductList(generics.ListAPIView):

    serializer_class = RetrieveProductSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):

        return Product.objects.all()


class ListingList(generics.ListCreateAPIView):

    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):

        if self.request.method == 'GET':
            return RetrieveProductSerializer
        return CreateProductSerializer

    def get_queryset(self):

        return Product.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = RetrieveProductSerializer
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
