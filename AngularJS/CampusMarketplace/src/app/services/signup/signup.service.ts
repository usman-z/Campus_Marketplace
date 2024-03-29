import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonnelData } from 'src/app/models/personnel/personnel.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  createUser(full_name: string, email: string, password: string, role: string){
    const url = 'https://uncgmarketplace.com/register';
    const request = {
      "full_name": full_name,
      "email": email,
      "password": password,
      "role": role
    };

    return this.http.post<PersonnelData>(url, request);

  };
}
