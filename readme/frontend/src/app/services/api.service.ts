import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';

import { Post } from '../models/post';
import { Profile } from '../models/profile';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    apiBase: string = 'http://localhost:8000/api';

    constructor(
        private httpClient: HttpClient
    ) { }

    public getLastPosts(): Observable<Post[]> {
        return this.httpClient.get<Post[]>(
            `${this.apiBase}/last-posts/`
        );
    }

    public getAllPosts(): Observable<Post[]> {
        return this.httpClient.get<Post[]>(
            `${this.apiBase}/posts/`
        );
    }

    public getPost(id: number): Observable<Post> {
        return this.httpClient.get<Post>(
            `${this.apiBase}/posts/${id}/`
        );
    }

    public deletePost(id: number): Observable<Post> {
        const body = new FormData();

        body.append('id', id.toString());
        body.append('token', localStorage.getItem('token'));
        body.append('author', localStorage.getItem('user_id'));

        return this.httpClient.post<Post>(
            `${this.apiBase}/post/delete`, body
        );
    }

    public getProfileById(id: number): Observable<Profile> {
        return this.httpClient.get<Profile>(
            `${this.apiBase}/profiles/${id}`
        );
    }

    public getProfile(username: string): Observable<Profile> {
        return this.httpClient.get<Profile>(
            `${this.apiBase}/profile/${username}`
        );
    }

    public createPost(title: string, text: string): Observable<Post> {
        const body = new FormData();

        body.append('post_text', text);
        body.append('token', localStorage.getItem('token'));
        body.append('title', title);
        body.append('pub_date', new Date().toISOString());
        body.append('author', localStorage.getItem('user_id'));

        return this.httpClient
        .post<Post>(`${this.apiBase}/posts/`, body);
    }
}
