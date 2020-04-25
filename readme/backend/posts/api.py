from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, action
from django.http import HttpResponseForbidden
from rest_framework import status
from rest_framework.response import Response

from .models import Post
from profiles.models import Profile
from django.contrib.auth.models import User
from .serializers import PostSerializer


def get_author(request, pk):
    return Profile.objects.get(pk=pk)

def has_permission(request, pk):
    author = get_author(request, pk)
    original_token = str(author.user.auth_token)
    request_token = request.POST['token']

    return original_token == request_token

@api_view(['POST'])
def delete_post(request):
    if (has_permission(request, request.POST['author'])):
        post = Post.objects.get(pk=request.POST['id'])
        post.delete()

        return Response("Post was deleted", status=status.HTTP_200_OK)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.order_by('-pub_date')
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PostSerializer


    def create(self, request, *args, **kwargs):
        author = get_author(request, request.POST['author'])

        if (has_permission(request, author.user.id)):
            post = Post.objects.create(
                post_text=request.POST['post_text'],
                title=request.POST['title'],
                pub_date=request.POST['pub_date'],
                author=author
            )

            serializer = PostSerializer(post)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return HttpResponseForbidden("You can't")


class LastPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.order_by('-pub_date')[:5]
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PostSerializer
