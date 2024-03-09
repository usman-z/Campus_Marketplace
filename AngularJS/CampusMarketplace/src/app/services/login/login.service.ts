import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    const url = 'http://localhost:8080/login';
    const request ={
      "email": email,
      "password": password
    }

    return this.http.post(url, request);
  };
}
