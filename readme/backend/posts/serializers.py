from rest_framework import serializers

from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    authorname = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_authorname(self, post):
        return post.author.user.username
