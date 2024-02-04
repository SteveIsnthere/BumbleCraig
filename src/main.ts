// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppComponent} from './app/app.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgOptimizedImage} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {isDevMode, importProvidersFrom} from '@angular/core';
import {ServiceWorkerModule} from '@angular/service-worker';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {authGuard} from './app/services/auth.guard';
import {provideRouter, Routes} from '@angular/router';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {provideAnimations} from '@angular/platform-browser/animations';
import {withInterceptorsFromDi, provideHttpClient} from '@angular/common/http';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
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
    importProvidersFrom(BrowserModule, MatButtonModule, MatIconModule, MatToolbarModule, MatBottomSheetModule, MatInputModule, FormsModule, MatSnackBarModule, MatListModule, MatMenuModule, MatCardModule, MatProgressSpinnerModule, MatBadgeModule, MatDialogModule, MatSelectModule, MatExpansionModule, MatChipsModule, MatProgressBarModule, MatStepperModule, ReactiveFormsModule, CdkDrag, ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }), MatTabsModule, MatSlideToggleModule, MatSidenavModule, NgOptimizedImage, MatAutocompleteModule),
    httpInterceptorProviders,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(appRoutes)
  ]
})
  .catch(err => console.error(err));
