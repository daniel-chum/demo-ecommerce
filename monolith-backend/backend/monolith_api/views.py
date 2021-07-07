from rest_framework import generics, permissions
from .serializers import ProductSerializer, UserSerializer, CartSerializer
from monolith_api.models import Product, Cart

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
    permission_classes = [permissions.IsAuthenticated]


    def get_queryset(self):

        return Product.objects.filter(user=self.request.user)
        
    def perform_create(self, serializer):

        serializer.save(user=self.request.user)


class ProductDetail(generics.RetrieveAPIView, generics.DestroyAPIView):

    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'

    def get_queryset(self):

        return Product.objects.all()

class CartList(generics.ListCreateAPIView, generics.DestroyAPIView):

    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):

        product_id = self.request.data['product']

        # Create product not already in cart, else do nothing
        if len(Cart.objects.filter(product=product_id)) == 0:
            serializer.save(user=self.request.user) 
