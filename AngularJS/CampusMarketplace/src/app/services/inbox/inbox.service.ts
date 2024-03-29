import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageData } from 'src/app/models/messages/message.model';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  constructor(private http: HttpClient) { }

  getInbox(userId: number){
    const url = 'https://uncgmarketplace.com/inbox';
    const request ={
      "userId": userId
    }

    return this.http.post<MessageData[]>(url, request);
  };
}
