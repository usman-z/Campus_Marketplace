import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  uploadProfilePicture(file: File, userId: number) {
    const url = 'https://uncgmarketplace.com:4443/uploadProfilePicture';

    const formData = new FormData();
    // const renamedFile = new File([file], `${userId}_${file.name}`);
    // formData.append('image', renamedFile);

    formData.append('image', file);

    return this.http.post(url, formData);
  }
}
