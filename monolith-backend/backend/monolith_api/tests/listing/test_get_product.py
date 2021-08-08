from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from ...models import Product
from ...serializers import ProductSerializer
import io
import json
from PIL import Image


class GetListingListTestCase(APITestCase):

    def generate_image_file(self):
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
            'images[0]image': self.generate_image_file()
        }

        self.valid_payload_2 = {
            'title': 'Product Two',
            'price': 2,
            'images[0]image': self.generate_image_file()
        }

        self.list_url = reverse('listing-list')

        User.objects.create_user(username='lauren', password='test_Pass')
        self.user = User.objects.get(username='lauren')

        self.client.force_authenticate(user=self.user)
        self.product_1 = self.client.post( self.list_url, data= self.valid_payload_1, format='multipart')
        self.product_2 = self.client.post( self.list_url, data= self.valid_payload_2, format='multipart')

    def test_get_product_valid(self):

        resp = self.client.get(reverse('product-detail', kwargs = {'id': self.product_1.data.get('id')} ))

        resp_data = json.dumps(resp.data).replace("http://testserver", "")

        product = Product.objects.get(id= self.product_1.data.get('id'))
        serializer = ProductSerializer(product)

        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp_data, json.dumps(serializer.data))

    def test_get_product_invalid(self):

        resp = self.client.get(reverse('product-detail', kwargs = {'id': 500} ))
        self.assertEqual(resp.status_code, status.HTTP_404_NOT_FOUND)
