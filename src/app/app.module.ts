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
    PostComponent
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
  

  MatDialogModule,
NgxSpinnerModule,
    MatToolbarModule
  ],
  providers: [{ provide: MatDialogRef, useValue: {}}, { provide: MAT_DIALOG_DATA, useValue: {} },],
  bootstrap: [AppComponent],

})
export class AppModule { }
