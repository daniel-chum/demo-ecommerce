from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from ...models import Cart
import io
from PIL import Image

class CreateCartTest(APITestCase):
    """ Test module for inserting a new cart """

    def generate_image(self):
        file = io.BytesIO()
        image = Image.new('RGB', (100, 100))
        image.save(file, 'png')
        file.name = 'test.png'
        file.seek(0)

        return file

    def setUp(self):

        self.valid_payload = {
            'title': 'Product One',
            'price': 22,
            'images[0]image': self.generate_image()
        }

        User.objects.create_user(username='lauren', password='test_Pass')
        self.user = User.objects.get(username='lauren')
        self.client.force_authenticate(user=self.user)
        product = self.client.post( reverse('listing-list'), data= self.valid_payload, format='multipart' )

        self.url = reverse('cart-list')

        self.valid_cart_payload = {
            'product_id': product.data.get('id'),
            'quantity': 1
        }

        self.invalid_cart_payload = {
            'product_id': 3000,
            'quantity': 1
        }

    def test_create_valid_cart_authenticated(self):

        response = self.client.post(
            self.url,
            data= self.valid_cart_payload
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Cart.objects.count(), 1)

    def test_create_invalid_cart_authenticated(self):

        response = self.client.post(
            self.url,
            data= self.invalid_cart_payload
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_cart_unauthenticated(self):

        self.client.force_authenticate(user=None)

        response = self.client.post(
            self.url,
            data= self.valid_cart_payload
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)