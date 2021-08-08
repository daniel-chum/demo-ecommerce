from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
import io
from PIL import Image

class GetProductListPaginationTestCase(APITestCase):

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
        self.client.post( self.list_url, data= self.valid_payload_1, format='multipart')
        self.client.post( self.list_url, data= self.valid_payload_2, format='multipart')

        self.client.force_authenticate(user=None)

    def test_get_product_list_pagination_valid(self):

        list_url = reverse('product-list-pagination')

        resp = self.client.get(list_url)
        # print(resp.data.count)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data.get('count'), 2)
