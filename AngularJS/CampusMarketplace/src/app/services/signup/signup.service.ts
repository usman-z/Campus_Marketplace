import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  createUser(full_name: string, email: string, password: string, role: string){
    const url = 'http://173.230.140.95:8080/register';
    const request = {
      "full_name": full_name,
      "email": email,
      "password": password,
      "role": role
    };

    return this.http.post(url, request);

  };
}
