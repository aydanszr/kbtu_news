from rest_framework.renderers import JSONRenderer
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseNotFound
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, renderer_classes
from django.views.decorators.csrf import csrf_exempt
from django import forms

from .models import Profile
from .serializers import ProfileSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [
        permissions.AllowAny,
    ]
    serializer_class = ProfileSerializer


class SignUpForm(forms.Form):
    username = forms.CharField(label='username', max_length='100')
    password = forms.CharField(label='password', max_length='100')


@api_view(['POST'])
@csrf_exempt
@renderer_classes([JSONRenderer])
def sign_up(request):
    form = SignUpForm(request.POST)
    print(form)

    if (not form.is_valid()):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    username = form.cleaned_data['username']
    password = form.cleaned_data['password']

    user = User.objects.create_user(
        username=username,
        password=password,
    )
    profile = Profile.objects.create(
        user=user,
    )

    return Response(
        ProfileSerializer(profile).data,
        status=status.HTTP_201_CREATED
    )

@api_view(['GET'])
@renderer_classes([JSONRenderer])
def profile(request, username):
    try:
        user = User.objects.get(username=username)
        profile = Profile.objects.get(id=user.id)
    except ObjectDoesNotExist: 
        return HttpResponseNotFound()

    return Response(
        ProfileSerializer(profile).data,
        status=status.HTTP_200_OK
    )
