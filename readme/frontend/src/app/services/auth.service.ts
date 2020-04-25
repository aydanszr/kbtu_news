import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs-compat';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    signInUrl = 'http://localhost:8000/sign-in/';
    signUpUrl = 'http://localhost:8000/sign-up/';
    public isSignedInSubj = new BehaviorSubject<boolean>(
        localStorage.getItem('token') !== null
    );

    constructor(
        private httpClient : HttpClient
    ) {}

    signUp(username: string, password: string) {
        const body = new FormData();
        body.append('username', username);
        body.append('password', password);

        return this.httpClient
        .post(this.signUpUrl, body)
        .pipe(
            shareReplay()
        );
    }

    signIn(username: string, password: string) {
       const signInSubj = this.httpClient
        .post(this.signInUrl, {
            username: username,
            password: password
        })
        .pipe(
            shareReplay()
        );

        signInSubj.subscribe(
            res => this.setSession(res, username),
            err => this.signOut()
        );

        return signInSubj;
    }

    private setSession(authResult, username) {
        localStorage.setItem('token', authResult.token);
        localStorage.setItem('username', username);
        localStorage.setItem('user_id', authResult.id);
        this.isSignedInSubj.next(true);
    }

    signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('user_id');
        this.isSignedInSubj.next(false);
    }
}
