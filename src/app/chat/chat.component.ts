import { Component, Signal, effect, signal } from '@angular/core';
import { SocketService } from '../WebSocket';
import { UserserviceService } from '../userservice.service';
import { AppComponent } from '../app.component';
import { User } from 'src/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandler } from 'src/filehandler';
import { DomSanitizer } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { ChatService } from '../chat.service';
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { cc } from 'chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  [x: string]: any;

  user: User = new User();
  Messages: any;
  chat: cc = new cc();
  chatUSer: User = new User();
  message: string = ''
  loggedUSer: any
  toUSer: any;
  messgaesss: cc[] = [];
  messagess = signal<cc[]>([]);
  likeChange = effect(() => {
    console.log("tjsdfif", this.ssss.pos);
  });
  constructor(private sss: UserserviceService, private sssss: AppComponent, private ro: ActivatedRoute, private sanitizer: DomSanitizer, private ssss: SocketService, private chstser: ChatService, private r: Router) {

    let e = document.getElementById("rot");
    let ele = document.getElementById("rem")
    ele?.remove()
    e?.classList.add('flex-1')

    let idd = this.ro.snapshot.paramMap.get('id');
    if (idd?.includes("\"")) {
      idd = idd.substring(1);
    }
    const id = sss.loggedinUSer();
    this._connect();
    console.log("looggg:" + id)
    if (id != null && idd != null) {
      chstser.getChatById(id, idd).subscribe(d => {
        this.messgaesss = d;
        this.messgaesss.sort((a: any, b: any) => {
          return <any>new Date(b.time) - <any>new Date(a.time);
        });
        this.messagess.set(this.messgaesss);
        for (let f of this.messgaesss) {
          console.log("earlier:" + JSON.stringify(f))
        }

      })
    }

    if (id != null) {
      this.loggedUSer = id;

      sss.getUserbyId(parseInt(id)).subscribe(d => {
        console.log('kkk' + d.name)
        this.user = d;
        this.user = this.createImageg(this.user);
        if (idd != null) {
          this.toUSer = idd
          sss.getUserbyId(parseInt(idd)).subscribe(d => {
            this.chatUSer = d;
            this.chatUSer = this.createImageg(this.chatUSer);
            console.log("cjatt" + JSON.stringify(this.chatUSer))
          })
        }

      })
    }





  }

  getUrl(id: any) {
    if (this.chatUSer.files.length == 0) {
      return "assets/images.jpeg";
    }
    else {
      return this.chatUSer.files[0].url;
    }



  }


  goooo(id: any) {
    this.r.navigate(['/main/others', this.chatUSer.id]);
  }
  to() {
    this.r.navigate(['/main/others', this.chatUSer.id]);
  }

  SendMessage() {

    console.log("loggedInUsr:" + this.loggedUSer)

    console.log("toSUser:" + this.toUSer)
    let e = {
      "message": this.message,
      "from": this.loggedUSer,
      "to": this.toUSer,
      "time": formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530')
    }

    this.message = ""

    // this.messgaesss.push(e);

    // this.messgaesss.sort((a:any, b:any) => {
    //   return <any>new Date(b.time) - <any>new Date(a.time);
    // });

    // console.log("messagessss:"+this.messgaesss)

    // this.messagess.set(this.messgaesss); 
    this._send(e);
    const id = this.sss.loggedinUSer();

  }

  createImageg(em: User) {
    if (em != undefined) {
      const images: any[] = em.files;
      const imgofFilehandle: FileHandler[] = [];
      if (images != undefined) {

        for (var i = 0; i < images.length; i++) {
          const imagedata = images[i];
          const imgblob = this.dataurltoBlob(imagedata.picbyte, imagedata.type);
          const files = new File([imgblob], imagedata.name, { type: imagedata.type });
          const filehandle: FileHandler = {
            file: files,
            url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files))
          }
          imgofFilehandle.push(filehandle);
        }
        em.files = imgofFilehandle;

      }

    }
    return em;
  }



  public dataurltoBlob(picBytes: any, imageType: any) {
    const bytestring = window.atob(picBytes);
    const arraybuffer = new ArrayBuffer(bytestring.length);
    const intbuffer = new Uint8Array(arraybuffer);
    for (var i = 0; i < bytestring.length; i++) {
      intbuffer[i] = bytestring.charCodeAt(i);
    }
    const blob = new Blob([intbuffer], { type: imageType });
    return blob;
  }

  webSocketEndPoint: string = 'https://insta-p4ma.onrender.com/ws';
  topic: string = "/topic/greetings";
  stompClient: any;
  messages: any = [];
  pos = signal<any>([]);
  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame: any) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent: any) {
        let ee = _this.onMessageReceived(sdkEvent)
        console.log("mess:" + ee)
        _this.messgaesss.push(ee)
        _this.messgaesss.sort((a: any, b: any) => {
          return <any>new Date(b.time) - <any>new Date(a.time);
        });

        console.log("beeee:" + _this.messgaesss)
        _this.messagess.set(_this.messgaesss)
        console.log(_this.messgaesss.length)
        console.log("all:" + _this.messagess)
        for (let f of _this.messgaesss) {
          console.log("after:" + JSON.stringify(f))
        }


      });
      //_this.stompClient.reconnect_delay = 2000;
    }, (error: string) => {
      console.log("errorCallBack -> " + error)
      setTimeout(this._connect, 5000);
    });
  };


  sortData(messages: any) {
    return
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  _send(message: any) {

    console.log("mmmm" + JSON.stringify(message))
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }

  onMessageReceived(message: any) {

    console.log("body:" + message.body)

    let ee = JSON.parse(message.body);
    console.log(ee)
    let e = {
      "message": message.body.message,
      "from": message.body.from,
      "to": message.body.to,
      "time": message.body.time
    }

    console.log("Message Recieved from Server :: " + message.body);


    console.log(e)
    return ee;
  }


}