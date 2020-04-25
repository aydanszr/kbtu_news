import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-sign-in-page',
    templateUrl: './sign-in-page.component.html',
    styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent implements OnInit {
    form: FormGroup;
    errorMessage: string;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    ngOnInit(): void {
    }

    signIn() {
        const val = this.form.value;

        if (val.username && val.password) {
            this.authService
            .signIn(val.username, val.password)
            .subscribe(
                () => {
                    this.router.navigateByUrl('/');
                },
                err => {
                    if (err.status === 400) {
                        this.errorMessage = "Неверный пароль или имя пользователя";
                    } else {
                        this.errorMessage = "Произошла неизвестная ошибка";
                    }
                }
            );
        } else {
            this.errorMessage = "Сперва заполните поля"
        }
    }

    signUp() {
        const val = this.form.value;

        this.authService
        .signUp(val.username, val.password)
        .subscribe(
            res => {
                this.signIn();
            },
            err => alert("Данное имя занято.")
        );
    }
}
