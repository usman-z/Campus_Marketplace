import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  createUser(first_name: string, last_name: string, email: string, password: string, role: string){
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
}
