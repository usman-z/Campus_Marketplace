import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonnelData } from 'src/app/models/personnel/personnel.model';

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

    return this.http.post<PersonnelData[]>(url, request);
  };
}
