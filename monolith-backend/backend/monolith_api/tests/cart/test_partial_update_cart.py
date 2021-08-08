from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
import io
from PIL import Image

class PartialUpdateCartTest(APITestCase):
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

        self.cart_payload = {
            'product_id': product.data.get('id'),
            'quantity': 1
        }

        self.cart = self.client.post( self.url, data= self.cart_payload )

    def test_update_cart_authorized_valid(self):

        response = self.client.patch(
            reverse('cart-update-delete', kwargs={'id': self.cart.data.get('id')}),
            data= {'quantity': 5}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('quantity'), 5)

    def test_update_cart_authorized_invalid(self):

        response = self.client.post(
            reverse('cart-update-delete', kwargs={'id': 500}),
            data= {'quantity': 5}
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_cart_unauthorized(self):

        self.client.force_authenticate(user=None)

        response = self.client.post(
            reverse('cart-update-delete', kwargs={'id': self.cart.data.get('id')}),
            data= {'quantity': 5}
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)