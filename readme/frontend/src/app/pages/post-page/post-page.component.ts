import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { Post } from '../../models/post';

@Component({
    selector: 'app-post-page',
    templateUrl: './post-page.component.html',
    styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
    post = new Post();

    constructor(
        private apiService : ApiService,
        private activatedRoute : ActivatedRoute,
        private router : Router
    ) { }

    ngOnInit(): void {
        const id : number = +this.activatedRoute
            .snapshot
            .paramMap
            .get("id");

        this.apiService
        .getPost(id)
        .subscribe(post => {
            this.post = post;
        });
    }

    getUsername() {
        return localStorage.getItem('username');
    }

    formatIsoDate(isoDate: string) : string {
        const date = new Date(isoDate);

        return date.toLocaleDateString('ru', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    deletePost() {
        if (!confirm("Удалить статью?")) return;

        this.apiService
        .deletePost(this.post.id)
        .subscribe(() => this.router.navigateByUrl('/'));
    }
}

