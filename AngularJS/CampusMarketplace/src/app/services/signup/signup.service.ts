import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  /**
   * Need to use a FormData object to send files as part of a multipart/form-data request
   * @param full_name
   * @param email
   * @param password
   * @param role
   * @param profile_img
   */
  createUser(full_name: string, email: string, password: string, role: string, profile_img: File){
    // changed to local because don't want to add to server just yet
    // just be sure to have personnel table locally exactly as server table
    const url = 'http://127.0.0.1:8080/register';
    const formData = new FormData();
    formData.append('full_name', full_name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('profile_img', profile_img);

    return this.http.post(url, formData);

  };
}
