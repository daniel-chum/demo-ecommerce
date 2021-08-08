from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
import io
from PIL import Image

class DeleteCartTest(APITestCase):

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

        self.valid_cart_payload = {
            'product_id': product.data.get('id'),
            'quantity': 1
        }

        self.cart = self.client.post( reverse('cart-list'), data= self.valid_cart_payload )

    def test_delete_valid_cart_authenticated(self):

        response = self.client.delete(reverse('cart-update-delete', kwargs= {'id': self.cart.data.get('id')}))

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


    def test_delete_invalid_cart_authenticated(self):

        response = self.client.delete(reverse('cart-update-delete', kwargs= {'id': 20}))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_cart_unauthenticated(self):

        self.client.force_authenticate(user= None)
        response = self.client.delete(reverse('cart-update-delete', kwargs = {'id': self.cart.data.get('id')}))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)