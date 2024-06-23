import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Message } from 'message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl = "https://insta-p4ma.onrender.com";

  constructor(private httpClient: HttpClient) { }


  updateChat(message: Message, chatId: any): Observable<Object> {
    return this.httpClient.put(this.baseUrl + "/chats/message/" + `${chatId}`, message);
  }

  getChatById(id :any,idd:any) {
    return this.httpClient.get<any>(this.baseUrl + "/getmessages/" + id +"/"+idd)
  }

  

  getAllMessagesById(chatId: any) {
    return this.httpClient.get<any>(this.baseUrl + "/getpreview/" + chatId)
  }

 

}