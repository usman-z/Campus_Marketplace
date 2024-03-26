import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PersonnelData } from 'src/app/models/personnel/personnel.model';
import { UserData } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user?: PersonnelData 

  constructor(private router: Router, private UserService: UserService, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user
  }

  product () {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['/product'], navigationExtras);
  }

  logOut() {
    this.router.navigate(['/']);
  }

  openImageUpload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.addEventListener('change', (event) => {
      const fileInput = event.target as HTMLInputElement;
      const file = fileInput.files && fileInput.files.length > 0 ? fileInput.files[0] : null;
      if (file) {
        this.uploadFile(file);
      }
    });
    fileInput.click();
  }
  
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    const uploadUrl = '/api/upload';
  
    this.http.post(uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / (event.total ?? 1));
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('File upload successful:', event.body);
        }
      },
      error => {
        console.error('File upload error:', error);
      }
    );
  }
  
}
