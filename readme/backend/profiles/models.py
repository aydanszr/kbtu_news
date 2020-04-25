from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(
        'auth.User',
        on_delete=models.CASCADE,
    )

    desc = models.TextField(blank=True)

    follows = models.ManyToManyField(
        'self',
        related_name='followed_by',
        symmetrical=False,
        blank=True
    )

    liked = models.ManyToManyField(
        'posts.Post',
        related_name='liked_by',
        blank=True
    )

    def __str__(self):
        return self.user.username

    def follow(self, profile):
        self.follows.add(profile)

    def unfollow(self, profile):
        self.follows.remove(profile)

    def is_following(self, profile):
        return self.follows.filter(pk=profile.pk).exists()

    def like(self, post):
        self.liked.add(post)

    def unlike(self, post):
        self.liked.remove(post)

    def has_liked(self, post):
        return self.liked.filter(pk=post.pk).exists()
