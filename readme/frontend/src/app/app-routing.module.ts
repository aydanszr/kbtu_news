import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConfig } from './configs/routes.config';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { WritePostPageComponent } from './pages/write-post-page/write-post-page.component';
import { AllPostsPageComponent } from './pages/all-posts-page/all-posts-page.component';

const routeNames = RoutesConfig.routeNames;

const routes: Routes = [
    {
        path: routeNames.home,
        component: HomePageComponent,
        pathMatch: 'full'
    },
    {
        path: routeNames.post,
        component: PostPageComponent
    },
    {
        path: routeNames.signIn,
        component: SignInPageComponent
    },
    {
        path: routeNames.notFound,
        component: NotFoundPageComponent
    },
    {
        path: routeNames.profile,
        component: ProfilePageComponent
    },
    {
        path: routeNames.writePost,
        component: WritePostPageComponent
    },
    {
        path: routeNames.allPosts,
        component: AllPostsPageComponent
    },
    {
        path: '**',
        redirectTo: RoutesConfig.routes.notFound
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            initialNavigation: 'enabled',
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
