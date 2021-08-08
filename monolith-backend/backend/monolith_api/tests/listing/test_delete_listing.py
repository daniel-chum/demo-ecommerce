from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ...models import Product
from django.contrib.auth.models import User
import io
from PIL import Image


class DeleteListingTest(APITestCase):
    """ Test module for inserting a new product """

    def setUp(self):
        file = io.BytesIO()
        image = Image.new('RGB', (100, 100))
        image.save(file, 'png')
        file.name = 'test.png'
        file.seek(0)

        self.valid_payload = {
            'title': 'Product One',
            'price': 22,
            'images[0]image': file
        }

        User.objects.create_user(username='lauren', password='test_Pass')
        self.user = User.objects.get(username='lauren')

        self.client.force_authenticate(user=self.user)
        self.listing = self.client.post( reverse('listing-list'), data= self.valid_payload, format='multipart')

    def test_delete_listing_unauthenticated(self):

        self.client.force_authenticate(user= None)
        response = self.client.delete(reverse('listing-delete', kwargs = {'id': self.listing.data.get('id')}))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_valid_listing_authenticated(self):

        response = self.client.delete(reverse('listing-delete', kwargs= {'id': self.listing.data.get('id')}))

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_listing_authenticated(self):

        response = self.client.delete(reverse('listing-delete', kwargs= {'id': 20}))

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
