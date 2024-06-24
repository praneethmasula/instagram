import { signal } from "@angular/core";
import { Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

export class SocketService {
    webSocketEndPoint: string = 'https://insta-p4ma.onrender.com/ws';
    topic: string = "/topic/greetings";
    stompClient: any;
    messages:any=[];
    pos=signal<any>([]);
    _connect() {
      
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      const _this = this;
      _this.stompClient.connect({}, function (frame: any) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
           let ee= _this.onMessageReceived(sdkEvent)
           
           _this.messages.push(ee)
           _this.messages.sort((a:any, b:any) => {
            return <any>new Date(b.time) - <any>new Date(a.time);
          });
           _this.pos.set(_this.messages)
           

            
        });
        //_this.stompClient.reconnect_delay = 2000;
      }, (error: string) => {
        
        setTimeout(this._connect, 5000);
      });
    };


     sortData(messages:any) {
        return 
      }
  
    _disconnect() {
      if (this.stompClient !== null) {
        this.stompClient.disconnect();
      }
      
    }
  
    _send(message: any) {
      
      
      
      this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }
  
    onMessageReceived(message:any) {
      
      return message.body;
    }
  }