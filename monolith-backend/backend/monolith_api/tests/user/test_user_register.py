from django.urls import reverse
from rest_framework import status

from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class UserSignUpTestCase(APITestCase):

    def test_if_data_is_correct_then_signup(self):

        signup_url = reverse('register')
        # Prepare data
        signup_dict = {
            'username': 'real_user_55',
            'password': 'test_Pass',
            'password2': 'test_Pass',
            "first_name": "Real",
            "last_name": 'User'
        }
        # Make request
        response = self.client.post(signup_url, signup_dict)

        # Check status response
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

        # Check database
        new_user = User.objects.get(username='real_user_55')
        self.assertEqual( new_user.first_name, 'Real'),
        self.assertEqual( new_user.last_name, 'User')

    def test_if_username_already_exists_dont_signup(self):

        signup_url = reverse('register')

        # Prepare data
        signup_dict = {
            'username': 'real_user_55',
            'password': 'test_Pass',
            'password2': 'test_Pass',
            "first_name": "Real",
            "last_name": 'User'
        }
        # Make first request
        response = self.client.post(signup_url, signup_dict)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Make second request with same user details
        response = self.client.post(signup_url, signup_dict)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            str(response.data['username'][0]),
            'A user with that username already exists.',
        )
        # Check database
        # Check that there is only one user with the saved username
        username_query = User.objects.filter(username='real_user_55')
        self.assertEqual(username_query.count(), 1)