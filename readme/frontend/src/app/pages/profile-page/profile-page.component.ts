import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs-compat';

import { ApiService } from '../../services/api.service';
import { Profile } from '../../models/profile';
import { Post } from '../../models/post';


function formatIsoDate(isoDate: string): string {
    const date = new Date(isoDate);

    return date.toLocaleDateString('ru-RU', {
        month: 'numeric',
        year: 'numeric',
        day: 'numeric'
    });
}

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
    profileSubj: Observable<Profile>;

    constructor(
        private apiService: ApiService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        activatedRoute.params.subscribe(params => {
            const username : string = activatedRoute
            .snapshot
            .paramMap
            .get("username");

            this.profileSubj = apiService
            .getProfile(username)
            .pipe(
                map((profile: Profile) => {
                    profile.posts = profile.posts.map(this.formatPost);
                    profile.liked = profile.liked.map(this.formatPost);

                    return profile;
                })
            );

            this.profileSubj.first().subscribe(
                res => {},
                    err => this.router.navigateByUrl('/not-found')
            );
        });
    }

    formatPost(post: Post): Post {
        return {
            id: post.id,
            title: post.title,
            pub_date: formatIsoDate(post.pub_date),
            post_text: post.post_text,
            authorname: post.authorname,
        };
    }

}

