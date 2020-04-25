from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=100)
    post_text = models.TextField()
    pub_date = models.DateTimeField()
    author = models.ForeignKey(
        'profiles.Profile',
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.title

class Comment(models.Model):
    comment_text = models.TextField()
    post = models.ForeignKey(
        'posts.Post',
        on_delete=models.CASCADE,
        related_name='comments',
    )
    author = models.ForeignKey(
        'profiles.Profile',
        on_delete=models.CASCADE,
        related_name='comments',
    )
