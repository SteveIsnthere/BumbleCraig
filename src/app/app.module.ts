import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SimpleFigureComponent} from './simple-figure/simple-figure.component';
import {UserComponent} from './user/user.component';
import {HttpClientModule} from "@angular/common/http";
import { FigureEditViewComponent } from './simple-figure/figure-edit-view/figure-edit-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleFigureComponent,
    UserComponent,
    FigureEditViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
