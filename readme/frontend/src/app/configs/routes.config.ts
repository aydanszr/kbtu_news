import {InjectionToken} from '@angular/core';

export let ROUTES_CONFIG = new InjectionToken('routes.config')


const routeNames = {
    home: '',
    notFound: 'not-found',
    post: 'post/:id',
    signIn: 'sign-in',
    profile: 'profile/:username',
    writePost: 'write-post',
    allPosts: 'all-posts'
}

export const RoutesConfig: any = {
    routeNames,
    routes: {
        home: `/${routeNames.home}`,
        notFound: `/${routeNames.notFound}`,
        post: `/${routeNames.post}`,
        signIn: `/${routeNames.signIn}`,
        profile: `/${routeNames.profile}`,
        writePost: `/${routeNames.writePost}`,
        allPosts: `/${routeNames.allPosts}`
    }
}
