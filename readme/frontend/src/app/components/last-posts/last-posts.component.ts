import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-last-posts',
    templateUrl: './last-posts.component.html',
    styleUrls: ['./last-posts.component.css']
})
export class LastPostsComponent implements OnInit {
    posts;

    constructor(
        private apiService: ApiService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.apiService
        .getLastPosts()
        .pipe(
            map((posts: any[]) => posts.map((post) => {
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
                    author: post.author,
                    authorname: post.authorname,
                    text: post.post__text,
                    title: post.title,
                    pub_date: formattedDate,
                };
            })),
        )
        .subscribe(
            posts => this.posts = posts,
            err => this.router.navigateByUrl('/not-found')
        );
    }

}
