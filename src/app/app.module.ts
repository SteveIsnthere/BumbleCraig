import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SimpleFigureComponent} from './simple-figure/simple-figure.component';
import {UserComponent} from './user/user.component';
import {HttpClientModule} from "@angular/common/http";
import {FigureEditViewComponent} from './simple-figure/figure-edit-view/figure-edit-view.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {UserDetailedViewComponent} from './user/user-detailed-view/user-detailed-view.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {RouterModule, Routes} from "@angular/router";
import {UserEditViewComponent} from './user/user-edit-view/user-edit-view.component';
import {HomeComponent} from './home/home.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {ChatComponent} from './chat/chat.component';
import {GroupComponent} from './chat/group/group.component';
import {GroupChatViewComponent} from './chat/group/group-chat-view/group-chat-view.component';
import {MatCardModule} from "@angular/material/card";
import {UserMiniComponent} from './user/user-mini/user-mini.component';
import {FileShareComponent} from './file-share/file-share.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FileUploadComponent} from './file-share/file-upload/file-upload.component';
import {TextEditViewComponent} from './chat/text-edit-view/text-edit-view.component';
import {InviteViewComponent} from './chat/group/invite-view/invite-view.component';
import {NotificationViewComponent} from './home/notification-view/notification-view.component';
import {MatBadgeModule} from "@angular/material/badge";
import {PostComponent} from './home/post/post.component';
import {PostFullViewComponent} from './home/post/post-full-view/post-full-view.component';
import {ImageFullViewComponent} from './file-share/image-full-view/image-full-view.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FriendsViewComponent} from './home/friends-view/friends-view.component';
import {FindUserViewComponent} from './home/friends-view/find-user-view/find-user-view.component';
import {PostSectionViewComponent} from './home/post/post-section-view/post-section-view.component';
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {
  PostSectionOptionsComponent
} from './home/post/post-section-view/post-section-options/post-section-options.component';
import {MatChipsModule} from "@angular/material/chips";
import {PostCommentsViewComponent} from './home/post/post-comments-view/post-comments-view.component';
import {PostPerceptionBarComponent} from './home/post/post-perception-bar/post-perception-bar.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NewPostViewComponent} from './home/post/new-post-view/new-post-view.component';
import {MatStepperModule} from "@angular/material/stepper";
import {httpInterceptorProviders} from "./services/http.interceptor";
import {LoginViewComponent} from './home/login-view/login-view.component';
import {CdkDrag} from "@angular/cdk/drag-drop";
import {UserSetUpComponent} from './user/user-set-up/user-set-up.component';
import {authGuard} from "./services/auth.guard";
import {PostLikeRowComponent} from './home/notification-view/post-like-row/post-like-row.component';
import {PostCommentRowComponent} from './home/notification-view/post-comment-row/post-comment-row.component';
import {FriendReqRowComponent} from './home/notification-view/friend-req-row/friend-req-row.component';
import {GroupInvRowComponent} from './home/notification-view/group-inv-row/group-inv-row.component';
import {SysMsgRowComponent} from './home/notification-view/sys-msg-row/sys-msg-row.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {MatTabsModule} from "@angular/material/tabs";
import {BackBtnComponent} from './compoents/back-btn/back-btn.component';
import {SignupLoadingViewComponent} from './home/login-view/signup-loading-view/signup-loading-view.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {PostFilesViewerComponent} from './home/post/post-files-viewer/post-files-viewer.component';
import {
  ReusableCommentsViewComponent
} from './home/post/post-comments-view/reusable-comments-view/reusable-comments-view.component';
import {AskTidderComponent} from './home/ask-tidder/ask-tidder.component';
import {LogoComponent} from './compoents/logo/logo.component';
import {RainbowStripComponent} from './compoents/rainbow-strip/rainbow-strip.component';
import {AboutComponent} from './compoents/about/about.component';
import {UserBriefComponent} from "./user/user-brief/user-brief.component";
import {BackgroundComponent} from "./compoents/background/background.component";
import {HomeButtonComponent} from "./compoents/home-button/home-button.component";
import {LoadingPlaceholderComponent} from "./compoents/loading-placeholder/loading-placeholder.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {CueCardComponent} from "./home/cue-card/cue-card.component";
import {PostSectionViewBaseComponent} from "./home/post/post-section-view/post-section-view-base/post-section-view-base.component";

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginViewComponent},
  {path: 'signup-loading', component: SignupLoadingViewComponent},
  {path: 'chat', component: ChatComponent, canActivate: [authGuard]},
  {path: 'group/:id', component: GroupChatViewComponent, canActivate: [authGuard]},
  {path: 'user/:id', component: UserDetailedViewComponent, canActivate: [authGuard]},
  {path: 'user-profile-edit', component: UserEditViewComponent, canActivate: [authGuard]},
  {path: 'friends', component: FriendsViewComponent, canActivate: [authGuard]},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    SimpleFigureComponent,
    UserComponent,
    FigureEditViewComponent,
    UserDetailedViewComponent,
    UserEditViewComponent,
    HomeComponent,
    ChatComponent,
    GroupComponent,
    GroupChatViewComponent,
    UserMiniComponent,
    FileShareComponent,
    FileUploadComponent,
    TextEditViewComponent,
    InviteViewComponent,
    NotificationViewComponent,
    PostComponent,
    PostFullViewComponent,
    ImageFullViewComponent,
    FriendsViewComponent,
    FindUserViewComponent,
    PostSectionViewComponent,
    PostSectionOptionsComponent,
    PostCommentsViewComponent,
    PostPerceptionBarComponent,
    NewPostViewComponent,
    LoginViewComponent,
    UserSetUpComponent,
    PostLikeRowComponent,
    PostCommentRowComponent,
    FriendReqRowComponent,
    GroupInvRowComponent,
    SysMsgRowComponent,
    BackBtnComponent,
    SignupLoadingViewComponent,
    PostFilesViewerComponent,
    ReusableCommentsViewComponent,
    AskTidderComponent,
    LogoComponent,
    RainbowStripComponent,
    AboutComponent,
    UserBriefComponent,
    LoadingPlaceholderComponent,
    CueCardComponent,
    PostSectionViewBaseComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatBottomSheetModule,
        RouterModule.forRoot(appRoutes),
        MatInputModule,
        FormsModule,
        MatSnackBarModule,
        MatListModule,
        MatMenuModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatBadgeModule,
        MatDialogModule,
        MatSelectModule,
        MatExpansionModule,
        MatChipsModule,
        MatProgressBarModule,
        MatStepperModule,
        ReactiveFormsModule,
        CdkDrag,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        MatTabsModule,
        MatSlideToggleModule,
        BackgroundComponent,
        HomeButtonComponent,
        MatSidenavModule,
    ],
  providers: [httpInterceptorProviders],
  exports: [
    UserComponent,
    UserMiniComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
