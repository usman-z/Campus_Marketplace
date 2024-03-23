import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(sender_id: number, receiver_id: number, message: string){
    const url = 'http://173.230.140.95:8080/sendMessage';
    const request ={
      "sender_id": sender_id,
      "receiver_id": receiver_id,
      "message": message
    }

    return this.http.post(url, request);
  };
}
