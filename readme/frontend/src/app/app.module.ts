import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LastPostsComponent } from './components/last-posts/last-posts.component';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { WritePostPageComponent } from './pages/write-post-page/write-post-page.component';
import { AllPostsPageComponent } from './pages/all-posts-page/all-posts-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    NotFoundPageComponent,
    LastPostsComponent,
    PostPageComponent,
    SignInPageComponent,
    ProfilePageComponent,
    WritePostPageComponent,
    AllPostsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
