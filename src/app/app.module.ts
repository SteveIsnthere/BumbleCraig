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
import {FormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { FriendRequestsListComponent } from './user/friend-requests-list/friend-requests-list.component';


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'user/:id', component: UserDetailedViewComponent},
  {path: 'user-profile-edit', component: UserEditViewComponent},
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
    FriendRequestsListComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
