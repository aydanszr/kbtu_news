from rest_framework import routers
from .api import PostViewSet, LastPostViewSet, delete_post
from django.urls import path

router = routers.DefaultRouter()
router.register('api/posts', PostViewSet, 'posts')
router.register(
    'api/last-posts',
    LastPostViewSet,
    'last-posts'
)

urlpatterns = router.urls + [
    path('api/post/delete', delete_post, name='delete-post'),
]
