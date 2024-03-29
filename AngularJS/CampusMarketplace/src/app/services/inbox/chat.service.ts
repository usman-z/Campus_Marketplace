import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatData } from 'src/app/models/messages/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChat(activeUserId: number, otherUserId: number){
    const url = 'https://uncgmarketplace.com/messages';
    const request ={
      "activeUser": activeUserId,
      "otherUser": otherUserId
    }

    return this.http.post<ChatData[]>(url, request);
  };
}
