from django.conf import settings
from rest_framework import serializers
from monolith_api.models import Product, Cart, ProductImages
from django.contrib.auth.models import User
from rest_framework_simplejwt import serializers as jwt_serializers
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "username",
            # "id",
            # "first_name",
            # "last_name",
            # "email",
        ]

class ProductImagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImages
        fields = ['image']

class ProductSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)
    images = ProductImagesSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'user', 'images']
    
    def create(self, validated_data):
        
        # Images should be sent as images[0]image, images[1]image in postman
        # Result will be images = ['image': <ImageObject>, 'image': <ImageObject>]
        images_data = validated_data.pop('images')
        
        product = Product.objects.create(**validated_data)

        for image_data in images_data:

            ProductImages.objects.create(product=product, **image_data)

        return product


class CartSerializer(serializers.ModelSerializer):

    # product = ProductSerializer()

    class Meta:
        model = Cart
        fields = ['id', 'product']

class TokenObtainPairSerializer(jwt_serializers.TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['refresh_expires'] = refresh["exp"]
        data['access'] = str(refresh.access_token)
        data['access_expires'] = refresh.access_token["exp"]

        return data


class TokenRefreshSerializer(serializers.Serializer):
    # Instead of inputting the refresh token from the HTTP body, we pull it
    # from the cookie

    def get_token_from_cookie(self):
        request = self.context["request"]
        return request.COOKIES.get("refresh_token")

    def validate(self, attrs):
        token = self.get_token_from_cookie()
        if token is None:
            raise serializers.ValidationError(
                "No refresh token cookie found"
            )
        refresh = RefreshToken(token)

        data = {
            "access": str(refresh.access_token),
            "access_expires": refresh.access_token["exp"]
        }

        if jwt_settings.BLACKLIST_AFTER_ROTATION:
            try:
                # Attempt to blacklist the given refresh token
                refresh.blacklist()
            except AttributeError:
                # If blacklist app not installed, `blacklist` method will
                # not be present
                pass

        refresh.set_jti()
        refresh.set_exp()

        data['refresh'] = str(refresh)
        data['refresh_expires'] = refresh["exp"]

        return data
