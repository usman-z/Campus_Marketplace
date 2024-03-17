import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonnelData } from 'src/app/models/personnel/personnel.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(userId: number){
    const url = 'http://localhost:8080/info';
    const request ={
      "userId": userId
    }

    return this.http.post<PersonnelData>(url, request);

  };
}
