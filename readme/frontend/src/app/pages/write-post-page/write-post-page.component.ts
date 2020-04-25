import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-write-post-page',
    templateUrl: './write-post-page.component.html',
    styleUrls: ['./write-post-page.component.css']
})
export class WritePostPageComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private router: Router
    ) {
        this.form = this.fb.group({
            'text': ['', Validators.required],
            'title': ['', Validators.required]
        });
    }

    createPost() {
        const val = this.form.value;

        if (!val.text || !val.title) return;

        this.apiService
            .createPost(val.title, val.text)
            .subscribe(
                res => this.router.navigateByUrl(`/post/${res.id}`),
                console.error
            );
    }
}
