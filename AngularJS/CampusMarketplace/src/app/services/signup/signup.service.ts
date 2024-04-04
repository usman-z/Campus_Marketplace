import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonnelData } from 'src/app/models/personnel/personnel.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  createUser(full_name: string, email: string, password: string, role: string, profile_img: File){
    const url = 'http://localhost:8080/register';
    const formData = new FormData();
    formData.append('full_name', full_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('profile_img', profile_img);

    return this.http.post<PersonnelData>(url, formData);

  };
}
