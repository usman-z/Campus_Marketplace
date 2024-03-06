import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  registerUser(first_name: string, last_name: string, email: string, password: string, role: string){
    const url = 'http://localhost:8080/register';
    const request = {
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "password": password,
      "role": role
    };

    return this.http.post(url, request);

  };

  LogInUser(email: string, password: string){
    const url = 'http://localhost:8080/log-in';
    const request ={
      "email": email,
      "password": password
    }

    return this.http.post(url, request);
  };


}
