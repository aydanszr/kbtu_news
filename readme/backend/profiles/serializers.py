from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Profile
from posts.models import Post
from posts.serializers import PostSerializer


def serialize(post: Post):
    return {
        "id": post.id,
        "title": post.title,
        "pub_date": post.pub_date,
        "authorname": post.author.user.username,
    }


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)
    posts = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'

    def get_username(self, profile):
        return profile.user.username

    def get_posts(self, profile):
        return map(serialize, profile.post_set.all())

    def to_representation(self, instance):
        data = super(ProfileSerializer, self).to_representation(instance)

        data['follows'] = map(
            lambda id: Profile.objects.get(pk=id).user.username,
            data['follows']
        )

        data['liked'] = map(
            lambda id: serialize(Post.objects.get(pk=id)),
            data['liked']
        )


        return data
