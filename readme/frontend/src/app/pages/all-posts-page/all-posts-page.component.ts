import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { Post } from '../../models/post';

@Component({
    selector: 'app-all-posts-page',
    templateUrl: './all-posts-page.component.html',
    styleUrls: ['./all-posts-page.component.css']
})
export class AllPostsPageComponent implements OnInit {
    posts: Post[];

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.apiService
        .getAllPosts()
        .map((posts: Post[]) => {
            return posts.map((post: Post) => {
                const date = new Date(
                    JSON.parse(`"${post.pub_date}"`)
                );

                const formattedDate = date
                .toLocaleDateString('ru-RU', {
                    weekday: 'long',
                    month: 'long',
                    year: 'numeric',
                    day: 'numeric'
                });

                return {
                    id: post.id,
                    authorname: post.authorname,
                    post_text: post.post_text,
                    title: post.title,
                    pub_date: formattedDate,
                };
            });
        }
            )
            .subscribe(posts => this.posts = posts);
    }

}
