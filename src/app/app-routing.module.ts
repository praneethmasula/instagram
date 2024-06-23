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
import { LayoutComponent } from './layout/layout.component';
import { Home2Component } from './home2/home2.component';
import { Profile1Component } from './profile1/profile1.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from './auth.guard';
import { resolveResolver } from './resolve.resolver';
import { PostComponent } from './post/post.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: 'main', component: HomeComponent, canActivate: [AuthGuard],
    resolve: { data: resolveResolver },
    children: [
      {
        path: '', component: FeedComponent, canActivate: [AuthGuard]

      },
      {
        path: 'search', component: SearchComponent, canActivate: [AuthGuard]
      },
      {
        path: 'messages', component: MessagesComponent, canActivate: [AuthGuard], children: [
          {
            path: 'direct/:id', component: ChatComponent
          }
        ]
      },
      {
        path: 'messagess', component: MessagesComponent, canActivate: [AuthGuard], children: [
          {
            path: 'direct/:id', component: ChatComponent
          }
        ]
      },
      {
        path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'feed', component: FeedComponent, resolve: { data: resolveResolver }, canActivate: [AuthGuard]
      },
      {
        path: 'profile', component: Profile1Component, canActivate: [AuthGuard]
      },
      {
        path: 'others/:id', component: OtherprofilesComponent, canActivate: [AuthGuard]
      },
      {
        path: 'accounts/edit', component: EditProfileComponent, canActivate: [AuthGuard]
      },
      {
        path: 'otherss/:id', component: OtherprofilesComponent, canActivate: [AuthGuard]
      },
      {
        path: 'messages/:id', component: MessagesComponent, canActivate: [AuthGuard], children: [
          {
            path: 'direct/:id', component: ChatComponent,canActivate: [AuthGuard]
          }
        ]
      }
    ]
  }
  ,
  {
    path: 'login', component: LoginComponent
  }, {
    path: 'register', component: RegisterComponent
  },
  {
    path: '', component: LoginComponent
  },
  {
    path: 'layout', component: LayoutComponent, children: [
      {
        path: 'search', component: SearchComponent
      },
      {
        path: 'messages', component: MessagesComponent
      },
      {
        path: 'notifications', component: NotificationsComponent
      },
      {
        path: 'homee/:id', component: Home2Component
      },
      {
        path: 'profile', component: Profile1Component
      },
      {
        path: 'others/:id', component: OtherprofilesComponent
      }
    ]

  }
  ,
  {
    path: 'post', component: PostComponent

  },
  {
    path: 'chat', component: ChatComponent
  }
  ,
  {
    path: '**', pathMatch: 'full',
    component: SearchComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
