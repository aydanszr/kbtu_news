import { Component } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs-compat';
import { Router, NavigationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isSignedIn: BehaviorSubject<boolean>;
    isOnProfilePage: Observable<boolean>;
    username: string = localStorage.getItem('username');

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        this.isSignedIn = authService.isSignedInSubj;
        this.isSignedIn.subscribe(() => {
            this.username = localStorage.getItem('username');
        });
        this.isOnProfilePage = this.router
        .events
        .pipe(
            filter(event => event instanceof NavigationEnd),
            map((event: NavigationEnd) => {
                return decodeURIComponent(event.url) === "/profile/" + this.username;
            }),
        );
    }


    signOut() {
        this.authService.signOut();
        this.router.navigateByUrl('/');
    }
}
