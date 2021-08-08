from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class AuthViewsTests(APITestCase):

    def test_obtain_access_and_refresh_token_user_created(self):

        url = reverse('token_obtain_pair')

        User.objects.create_user(username='user', email='user@foo.com', password='pass')

        # Test wrong credentials
        resp = self.client.post(url, {'username':'wrong_username', 'password':'pass'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        resp = self.client.post(url, {'username':'username', 'password':'wrong_pass'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Test correct credentials and return values
        resp = self.client.post(url, {'username':'user', 'password':'pass'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        self.assertTrue('access' in resp.data)
        self.assertTrue('refresh' in resp.data)
        self.assertTrue('refresh_expires' in resp.data)

    def test_obtain_access_and_refresh_token_user_not_created(self):

        url = reverse('token_obtain_pair')

        # Test no user found
        resp = self.client.post(url, {'username':'user', 'password':'pass'}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_refresh_access_token_has_http_only_cookie(self):

        token_url = reverse('token_obtain_pair')
        refresh_url = reverse('token_refresh')
        # Get and store resfresh_token in http_only cookie
        User.objects.create_user(username='user', email='user@foo.com', password='pass')
        self.client.post(token_url, {'username':'user', 'password':'pass'}, format='json')

        # Test incorrect request method (Only POST allowed)
        resp = self.client.get(refresh_url, data={'format': 'json'})
        self.assertEqual(resp.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

        # Test correct refresh token in http_only cookie
        resp = self.client.post(refresh_url, data={'format': 'json'})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_refresh_access_token_no_http_only_cookie(self):

        token_url = reverse('token_obtain_pair')
        refresh_url = reverse('token_refresh')

        # Test no http_only cookie found in browser
        resp = self.client.post(refresh_url)

        self.assertEqual(resp.data, {"non_field_errors": ["No refresh token cookie found"]})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_logout_has_http_only_cookie(self):

        token_url = reverse('token_obtain_pair')
        refresh_url = reverse('token_refresh')
        logout_url  = reverse('logout')

        # Get and store resfresh_token in http_only cookie
        User.objects.create_user(username='user', email='user@foo.com', password='pass')
        self.client.post(token_url, {'username':'user', 'password':'pass'}, format='json')

        # Test still have refresh token
        resp = self.client.post(refresh_url, data={'format': 'json'})
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        # Test logout response with http_only cookie
        resp = self.client.post(logout_url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        # Test no more refresh token
        resp = self.client.post(refresh_url, data={'format': 'json'})
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_no_http_only_cookie(self):

        logout_url  = reverse('logout')

        # Test logout response with no http_only cookie
        resp = self.client.post(logout_url)
        self.assertEqual(resp.data, {"non_field_errors": ["No refresh token cookie found"]})
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)