import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } 
    from '@angular/material/card'

import {  MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component'
import { MatToolbarModule } from '@angular/material/toolbar'

import { MatButtonModule } from '@angular/material/button'
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { SearchComponent } from './search/search.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FeedComponent } from './feed/feed.component'
import { MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CreatepostComponent } from './createpost/createpost.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';

import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import { OtherprofilesComponent } from './otherprofiles/otherprofiles.component';
import { PostComponent } from './post/post.component';

import { FlexLayoutModule } from "@angular/flex-layout";
import { Profile1Component } from './profile1/profile1.component';
import { Home2Component } from './home2/home2.component';
import { LayoutComponent } from './layout/layout.component';

import {MatBadgeModule} from '@angular/material/badge';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

import {

  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from "ngx-ui-loader";
import { NONE_TYPE } from '@angular/compiler';
import { FollowrsComponent } from './followrs/followrs.component';
import { ChatComponent } from './chat/chat.component';
import { SocketService } from './WebSocket';
import { NgHttpInterceptor } from 'httpinterceptor';
import { SearchUSerForChatComponent } from './search-user-for-chat/search-user-for-chat.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "rgba(255,255,255,0.95)",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 15,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "rgba(255,255,255,0.97)",
  "fgsPosition": "center-center",
  "fgsSize": 20,
  "fgsType": "three-strings",
 
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "rgba(255,255,255,0.97)",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}
;


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    MessagesComponent,
    NotificationsComponent,
    FeedComponent,
    LoginComponent,
    RegisterComponent,
    CreatepostComponent,
    ProfileComponent,
    OtherprofilesComponent,
    PostComponent,
    Profile1Component,
    Home2Component,
    LayoutComponent,
    EditProfileComponent,
    FollowrsComponent,
    ChatComponent,
    SearchUSerForChatComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatMenuModule,
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTabsModule,
  MatGridListModule,
  FlexLayoutModule,
  NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  MatDialogModule,
NgxSpinnerModule,
    MatToolbarModule,
    // NgxUiLoaderHttpModule.forRoot({
    //   showForeground:true
    // }) ,
    MatBadgeModule,
  
  
    
  ],

  providers: [{ provide: MatDialogRef, useValue: {}}, { provide: MAT_DIALOG_DATA, useValue: {} },{provide: WebSocket, useValue: 'ws://127.0.0.1:7000'},SocketService,NgHttpInterceptor],
  bootstrap: [AppComponent],

})
export class AppModule { }
