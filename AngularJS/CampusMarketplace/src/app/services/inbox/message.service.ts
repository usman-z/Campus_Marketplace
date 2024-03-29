import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(sender_id: number, receiver_id: number, message: string){
    const url = 'https://uncgmarketplace.com:4443/sendMessage';
    const request ={
      "sender_id": sender_id,
      "receiver_id": receiver_id,
      "message": message
    }

    return this.http.post(url, request);
  };
}
