from django.urls import path
from .views import Register, Profile, ProductListPagination, ListingList, ProductDetail, CartList
from .jwt_views import Login, RefreshToken, Logout

urlpatterns = [
    path("api/profile", Profile.as_view(), name="profile"),
    path('api/listing', ListingList.as_view(), name='listing-list'),
    path('api/listing/<int:id>', ListingList.as_view(), name='listing-delete'),
    path('api/product', ProductListPagination.as_view(), name='product-list-pagination'),
    path('api/product/<int:id>',
         ProductDetail.as_view(), name='product-detail'),
    path("api/cart", CartList.as_view(), name="cart-list"),
    path("api/cart/<int:id>", CartList.as_view(), name="cart-update-delete"),

    #Authentication
    path("api/register", Register.as_view(), name='register'),
    path('api/token', Login.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', RefreshToken.as_view(), name='token_refresh'),
    path("api/token/logout", Logout.as_view(), name="logout"),
]
