from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProductSerializer, UserSerializer, CartSerializer
from monolith_api.models import Product, Cart
from .paginations import ProductPagination

class Register(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()

class Profile(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class ProductListPagination(generics.ListAPIView):

    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class= ProductPagination

    def get_queryset(self):

        return Product.objects.order_by('-created')

class ListingList(generics.ListCreateAPIView, generics.DestroyAPIView):

    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):

        return Product.objects.filter(user=self.request.user)

    def perform_create(self, serializer):

        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):

        if len(request.data) > 5:
            message = {'Images': ['Maximum 3 images.']}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class ProductDetail(generics.RetrieveAPIView):

    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'

    def get_queryset(self):

        return Product.objects.all()

class CartList(generics.ListCreateAPIView, generics.DestroyAPIView, generics.UpdateAPIView):

    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):

        product_id = self.request.data['product_id']

        # Create product not already in cart, else do nothing
        if len(Cart.objects.filter(product__id=product_id, user=self.request.user)) == 0: # Double underscore for nested serializer field
            serializer.save(user=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True

        quantity = request.data['quantity']

        try:
            if int(quantity) < 1:
                message = {'Insufficient quantity': 'Quantity must be more than 0'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            message = {'Insufficient quantity': 'Quantity is blank'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        return self.update(request, *args, **kwargs)
