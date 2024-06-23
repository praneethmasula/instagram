import { Component, signal } from '@angular/core';
import { SocketService } from './WebSocket';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'instagrammmm';
  stompClient:any;
 s=signal(1);
 private serverUrl = 'http://localhost:8080/socket'
 constructor(){
  // ss.connectToChat();
  // ss._connect();
 }





}
