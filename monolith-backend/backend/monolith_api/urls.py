from django.urls import path
from .views import Profile, HomePageProductList, ListingList, ProductDetail, OrderList
from .jwt_views import Login, RefreshToken, Logout

urlpatterns = [
    path("api/profile", Profile.as_view(), name="profile"),
    path('api/homepage', HomePageProductList.as_view(), name='homepage-product'),
    path('api/listing', ListingList.as_view(), name='listing-list'),
    path('api/product/<int:id>',
         ProductDetail.as_view(), name='product-detail'),
    path("api/order", OrderList.as_view(), name="order-list"),

    #Authentication
    path('api/token', Login.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', RefreshToken.as_view(), name='token_refresh'),
    path("api/token/logout", Logout.as_view(), name="logout"),
]
