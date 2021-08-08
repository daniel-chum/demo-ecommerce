from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
import io
from PIL import Image

class GetCartListTestCase(APITestCase):

    def generate_image(self):
        file = io.BytesIO()
        image = Image.new('RGB', (100, 100))
        image.save(file, 'png')
        file.name = 'test.png'
        file.seek(0)

        return file

    def setUp(self):

        self.valid_payload_1 = {
            'title': 'Product One',
            'price': 1,
            'images[0]image': self.generate_image()
        }

        self.valid_payload_2 = {
            'title': 'Product Two',
            'price': 2,
            'images[0]image': self.generate_image()
        }

        User.objects.create_user(username='lauren', password='test_Pass')
        self.user = User.objects.get(username='lauren')

        self.client.force_authenticate(user=self.user)
        self.product_1 = self.client.post( reverse('listing-list'), data= self.valid_payload_1, format='multipart')
        self.product_2 = self.client.post( reverse('listing-list'), data= self.valid_payload_2, format='multipart')

        self.url = reverse('cart-list')

        self.cart_payload_1 = {
            'product_id': self.product_1.data.get('id'),
            'quantity': 1
        }

        self.cart_payload_2 = {
            'product_id': self.product_2.data.get('id'),
            'quantity': 2
        }

        self.cart_1 = self.client.post( self.url, data= self.cart_payload_1 )
        self.cart_2 = self.client.post( self.url, data= self.cart_payload_2 )

    def test_get_cart_valid_authorized(self):

        resp = self.client.get(self.url)

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resp.data), 2)

    def test_get_cart_unauthorized(self):

        self.client.force_authenticate(user=None)

        resp = self.client.get(self.url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)