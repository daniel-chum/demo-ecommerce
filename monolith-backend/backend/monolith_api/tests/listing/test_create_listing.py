from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
import io
from PIL import Image


class CreateListingTest(APITestCase):
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

        self.invalid_payload = {
            'title': '',
            'price': 22
        }

        self.url = reverse('listing-list')

        User.objects.create_user(username='lauren', password='test_Pass')
        self.user = User.objects.get(username='lauren')

    def test_create_listing_unauthenticated(self):
        response = self.client.post(
            self.url,
            data= self.valid_payload,
            format='multipart'
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_valid_listing_authenticated(self):

        self.client.force_authenticate(user=self.user)

        response = self.client.post(
            self.url,
            data= self.valid_payload,
            format='multipart'
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_listing_authenticated(self):

        self.client.force_authenticate(user=self.user)

        response = self.client.post(
            self.url,
            data= self.invalid_payload,
            format='multipart'
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)