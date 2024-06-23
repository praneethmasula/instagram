import { signal } from "@angular/core";
import { Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

export class SocketService {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/greetings";
    stompClient: any;
    messages:any=[];
    pos=signal<any>([]);
    _connect() {
      console.log("Initialize WebSocket Connection");
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      const _this = this;
      _this.stompClient.connect({}, function (frame: any) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
           let ee= _this.onMessageReceived(sdkEvent)
           console.log("mess:"+ee)
           _this.messages.push(ee)
           _this.messages.sort((a:any, b:any) => {
            return <any>new Date(b.time) - <any>new Date(a.time);
          });
           _this.pos.set(_this.messages)
           console.log("all:"+_this.messages)

            
        });
        //_this.stompClient.reconnect_delay = 2000;
      }, (error: string) => {
        console.log("errorCallBack -> " + error)
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
      console.log("Disconnected");
    }
  
    _send(message: any) {
      
      console.log("mmmm"+JSON.stringify(message))
      console.log("calling logout api via web socket");
      this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }
  
    onMessageReceived(message:any) {
      console.log("Message Recieved from Server :: " + message.body);
      return message.body;
    }
  }