from django.urls import path
from .views import Profile, AllProductList, ListingList, ProductDetail, CartList
from .jwt_views import Login, RefreshToken, Logout

urlpatterns = [
    path("api/profile", Profile.as_view(), name="profile"),
    path('api/homepage', AllProductList.as_view(), name='homepage-product'),
    path('api/listing', ListingList.as_view(), name='listing-list'),
    path('api/product/<int:id>',
         ProductDetail.as_view(), name='product-detail'),
    path("api/cart", CartList.as_view(), name="cart-list"),

    #Authentication
    path('api/token', Login.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', RefreshToken.as_view(), name='token_refresh'),
    path("api/token/logout", Logout.as_view(), name="logout"),
]
