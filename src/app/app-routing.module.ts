import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { MessagesComponent } from './messages/messages.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { OtherprofilesComponent } from './otherprofiles/otherprofiles.component';

const routes: Routes = [
 {
  path:'main',component:HomeComponent,children:[
    {
      path:'search',component:SearchComponent
    },
    {
      path:'messages',component:MessagesComponent
    },
    {
      path:'notifications',component:NotificationsComponent
    },
    {
      path:'feed/:id',component:FeedComponent
    },
    {
      path:'profile',component:ProfileComponent
    },
    {
      path:'others/:id',component:OtherprofilesComponent
    }
  ]
 }
 ,
  {
    path:'login',component:LoginComponent
  },{
    path:'register',component:RegisterComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
