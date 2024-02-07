// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppComponent} from './app/app.component';
import {isDevMode, importProvidersFrom} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {authGuard} from './app/services/auth.guard';
import {provideRouter, Routes} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import {withInterceptorsFromDi, provideHttpClient} from '@angular/common/http';
import {bootstrapApplication} from '@angular/platform-browser';
import {httpInterceptorProviders} from './app/services/http.interceptor';

const appRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./app/home/home.component').then(mod => mod.HomeComponent),
    canActivate: [authGuard], data: {state: 'home'}
  },
  {
    path: 'login',
    loadComponent: () => import('./app/home/login-view/login-view.component').then(mod => mod.LoginViewComponent),
    data: {state: 'login'}
  },
  {
    path: 'chat', loadComponent: () => import('./app/chat/chat.component').then(mod => mod.ChatComponent),
    canActivate: [authGuard], data: {state: 'chat'}
  },
  {
    path: 'group/:id',
    loadComponent: () => import('./app/chat/group/group-chat-view/group-chat-view.component').then(mod => mod.GroupChatViewComponent),
    canActivate: [authGuard],
    data: {state: 'group'}
  },
  {
    path: 'user/:id',
    loadComponent: () => import('./app/user/user-detailed-view/user-detailed-view.component').then(mod => mod.UserDetailedViewComponent),
    canActivate: [authGuard],
    data: {state: 'user'}
  },
  {
    path: 'user-profile-edit',
    loadComponent: () => import('./app/user/user-edit-view/user-edit-view.component').then(mod => mod.UserEditViewComponent),
    canActivate: [authGuard],
    data: {state: 'user-profile-edit'}
  },
  {
    path: 'friends',
    loadComponent: () => import('./app/home/friends-view/friends-view.component').then(mod => mod.FriendsViewComponent),
    canActivate: [authGuard],
    data: {state: 'friends'}
  },
  {
    path: 'about', loadComponent: () => import('./app/compoents/about/about.component').then(mod => mod.AboutComponent),
    data: {state: 'about'}
  },
  {
    path: 'new-post',
    loadComponent: () => import('./app/home/post/new-post-view/new-post-view.component').then(mod => mod.NewPostViewComponent),
    canActivate: [authGuard],
    data: {state: 'new-post'}
  },
  {
    path: 'viewed-posts',
    loadComponent: () => import('./app/home/post/viewed-posts-view/viewed-posts-view.component').then(mod => mod.ViewedPostsViewComponent),
    canActivate: [authGuard],
    data: {state: 'viewed-posts'}
  },
  {
    path: 'liked-posts',
    loadComponent: () => import('./app/home/post/liked-posts-view/liked-posts-view.component').then(mod => mod.LikedPostsViewComponent),
    canActivate: [authGuard],
    data: {state: 'liked-posts'}
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })),
    httpInterceptorProviders,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(appRoutes)
  ]
})
  .catch(err => console.error(err));
