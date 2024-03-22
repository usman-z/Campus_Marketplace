import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatData } from 'src/app/models/messages/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChat(activeUserId: number, otherUserId: number){
    const url = 'http://173.230.140.95:8080/messages';
    const request ={
      "activeUser": activeUserId,
      "otherUser": otherUserId
    }

    return this.http.post<ChatData[]>(url, request);
  };
}
