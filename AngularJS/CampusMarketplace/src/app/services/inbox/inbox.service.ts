import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageData } from 'src/app/models/messages/message.model';
import { MessageCountData } from 'src/app/models/messages/message_count.model';

@Injectable({
  providedIn: 'root'
})
export class InboxService {

  constructor(private http: HttpClient) { }

  getInbox(userId: number){
    const url = 'https://uncgmarketplace.com:4443/inbox';
    const request ={
      "userId": userId
    }

    return this.http.post<MessageData[]>(url, request);
  };

  getMessageCount(userId: number){
    const url = 'https://uncgmarketplace.com:4443/getMessageCount';
    const request ={
      "userId": userId
    }

    return this.http.post<MessageCountData>(url, request);
  };
}
