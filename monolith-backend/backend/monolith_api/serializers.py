from django.conf import settings
from rest_framework import serializers
from monolith_api.models import Product, Cart, ProductImages
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt import serializers as jwt_serializers
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(required=False, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):

        validated_data.pop("password2")
        user = User.objects.create(**validated_data)

        user.set_password(validated_data['password'])
        user.save()

        return user

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

    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset = Product.objects.all(), write_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'product', 'quantity', 'product_id']

    def create(self, validated_data):

        product = validated_data.pop('product_id')

        cart = Cart.objects.create(product=product, **validated_data)

        return cart

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
