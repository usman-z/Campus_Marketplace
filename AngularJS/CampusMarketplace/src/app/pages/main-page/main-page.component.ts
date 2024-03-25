import { Component } from '@angular/core';

import { NavigationExtras, Router } from '@angular/router';
import { PersonnelData } from 'src/app/models/personnel/personnel.model';
import { UserData } from 'src/app/models/user/user.model';
import { ImageUploadService } from 'src/app/services/images/image-upload.service';
import { LoginService } from 'src/app/services/login/login.service';
import { SignupService } from 'src/app/services/signup/signup.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  loading: boolean = false;
  isLoading: boolean = true
  userLoggingIn?: PersonnelData[]
  profilePicture?: File;

  first_name: string = ''
  last_name: string = ''
  email: string = ''
  password: string = ''
  role: string = ''
  errorMessage: string = ''
  successMessage: string = '';

  constructor(private router: Router, private loginService: LoginService, private imageUploadService: ImageUploadService, private signUpService: SignupService) {}

  register(){
    this.loading = true
    if(this.first_name && this.last_name && this.email && this.password && this.role){
      let full_name = this.first_name+' '+this.last_name
      this.signUpService.createUser(full_name, this.email, this.password, this.role)
        .subscribe({
          next: (response) => {
            this.loading = false
            this.successMessage = 'Please check Email and Verify';
            setTimeout(() => {
              this.successMessage ='';
            }, 4000);
            
            let user: PersonnelData = response
            if (this.profilePicture) {
              console.log(this.profilePicture)
              this.imageUploadService.uploadProfilePicture(this.profilePicture, user.user_id)
              .subscribe({
                next: (response) => {
                  console.log('call success')
                },
                error: (error) => {
                  // Handle error response if needed
                }
              });
            }
          },
          error: (error) => {
            this.loading = false
            this.errorMessage = error.error.error;
            setTimeout(() => {
              this.errorMessage ='';
            }, 4000);
          }
        });
    } else {
      this.loading = false
      this.errorMessage = 'All information is required!';
      setTimeout(() => {
        this.errorMessage ='';
      }, 4000);
    }
  }

  onLogin(){
    this.loading = true
    if(this.email && this.password){
      this.loginService.login(this.email, this.password)
        .subscribe({
          next: (response) => {
            this.loading = false
            this.userLoggingIn = response
            if (this.userLoggingIn[0].email_verified) {
              this.successMessage = 'Log In successful';
              const navigationExtras: NavigationExtras = {
                state: {
                  user: response
                }
              };
              // Redirect to main page component with user information
              this.router.navigate(['/home'], navigationExtras);
              setTimeout(() => {
                this.successMessage ='';
              }, 4000);
            }
            else {
              this.errorMessage = 'User not verified';
              setTimeout(() => {
                this.errorMessage ='';
              }, 4000);
            }
          },
          error: (error) => {
            this.loading = false
            this.errorMessage = 'No such user found!';
            setTimeout(() => {
              this.errorMessage ='';
            }, 4000);
          }
        });
    } else {
      this.loading = false
      this.errorMessage = 'All information is required!';
      setTimeout(() => {
        this.errorMessage ='';
      }, 4000);
    }
  }

  onChange(action: string) {
    // Clear form fields based on the action
    if (action === 'loggingIn') {
      this.email = '';
      this.password = '';
    } else if (action === 'signingUp') {
      this.first_name = '';
      this.last_name = '';
      this.email = '';
      this.password = '';
      this.role = '';
    }
  }


}
