import { Component } from '@angular/core';

import { NavigationExtras, Router } from '@angular/router';
import { UserData } from 'src/app/models/user/user.model';
import { LoginService } from 'src/app/services/login/login.service';
import { SignupService } from 'src/app/services/signup/signup.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  loggingIn: boolean = true;
  isLoading: boolean = true

  first_name: string = ''
  last_name: string = ''
  email: string = ''
  password: string = ''
  role: string = ''
  errorMessage: string = ''
  successMessage: string = '';

  constructor(private router: Router, private loginService: LoginService, private signUpService: SignupService) {}

  register(){
    if(this.first_name && this.last_name && this.email && this.password && this.role){
      let full_name = this.first_name+' '+this.last_name
      this.signUpService.createUser(full_name, this.email, this.password, this.role)
        .subscribe({
          next: (response) => {
            this.successMessage = 'Sign Up successful';
            setTimeout(() => {
              this.successMessage ='';
            }, 4000);
          },
          error: (error) => {
            this.errorMessage = 'Sign Up failed';
            setTimeout(() => {
              this.errorMessage ='';
            }, 4000);
          }
        });
    } else {
      this.errorMessage = 'All information is required!';
      setTimeout(() => {
        this.errorMessage ='';
      }, 4000);
    }
  }

  onLogin(){
    if(this.email && this.password){
      this.loginService.login(this.email, this.password)
        .subscribe({
          next: (response) => {
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
          },
          error: (error) => {
            this.errorMessage = 'Log In failed';
            setTimeout(() => {
              this.errorMessage ='';
            }, 4000);
          }
        });
    } else {
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
