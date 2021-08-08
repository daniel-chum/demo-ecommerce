from django.urls import reverse
from rest_framework import status

from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class GetProfileTestCase(APITestCase):

    def setUp(self):

        User.objects.create_user(username='real_user_55', password='test_Pass')

    def test_get_user_profile_authenticated(self):

        profile_url = reverse('profile')

        # self.client.login( username="real_user_55", password="test_Pass")
        user = User.objects.get(username='real_user_55')
        self.client.force_authenticate(user=user)

        # Test authenticated request to profile view API
        resp = self.client.get(profile_url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_get_user_profile_unauthenticated(self):

        profile_url = reverse('profile')

        self.client.force_authenticate(user=None)

        resp = self.client.get(profile_url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)
