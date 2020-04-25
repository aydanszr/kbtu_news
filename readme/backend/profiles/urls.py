from rest_framework import routers
from rest_framework.authtoken.views import ObtainAuthToken
from django.urls import path
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .api import ProfileViewSet, sign_up, profile

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={ 'request': request }
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'id': user.pk,
        })

router = routers.DefaultRouter()
router.register('api/profiles', ProfileViewSet, 'profiles')

urlpatterns = router.urls + [
    path('sign-up/', sign_up, name='sign-up'),
    path('sign-in/', CustomAuthToken.as_view(), name='sign-in'),
    path('api/profile/<str:username>', profile, name='profile'),
]
