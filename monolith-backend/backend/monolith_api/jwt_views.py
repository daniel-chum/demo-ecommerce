import datetime as dt
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

from . import serializers


class TokenViewBaseWithCookie(TokenViewBase):

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        resp = Response(serializer.validated_data, status=status.HTTP_200_OK)

        expiration = (
            dt.datetime.utcnow() + jwt_settings.REFRESH_TOKEN_LIFETIME
        )

        resp.set_cookie(
            "refresh_token",
            serializer.validated_data["refresh"],
            expires=expiration,
            secure=False,
            httponly=True,
            samesite="Lax"
        )

        return resp


class Login(TokenViewBaseWithCookie):
    serializer_class = serializers.TokenObtainPairSerializer


class RefreshToken(TokenViewBaseWithCookie):
    serializer_class = serializers.TokenRefreshSerializer


class Logout(APIView):

    def post(self, *args, **kwargs):
        resp = Response({})
        resp.delete_cookie("refresh_token")
        return resp
