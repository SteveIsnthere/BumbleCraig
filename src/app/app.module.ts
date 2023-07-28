import {NgModule} from '@angular/core';
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

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'post/:id', component: PostFullViewComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'group/:id', component: GroupChatViewComponent},
  {path: 'user/:id', component: UserDetailedViewComponent},
  {path: 'user-profile-edit', component: UserEditViewComponent},
  {path: 'friends', component: FriendsViewComponent},
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
    NewPostViewComponent
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
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
