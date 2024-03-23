import {Component} from '@angular/core';

import {NavigationExtras, Router} from '@angular/router';
import {LoginService} from 'src/app/services/login/login.service';
import {SignupService} from 'src/app/services/signup/signup.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  loggingIn: boolean = true;
  isLoading: boolean = true

  full_name: string = ''
  email: string = ''
  password: string = ''
  role: string = ''
  profile_img: File | null = null;
  errorMessage: string = ''
  successMessage: string = '';

  constructor(private router: Router, private loginService: LoginService, private signUpService: SignupService) {}

  /**
   * When you bind a file input to [(ngModel)], it doesn't work as expected.
   * You need to handle file inputs differently because they are not bound directly to the model like other inputs.
   * @param event
   */
  onFileSelected(event: any) {
    this.profile_img = event.target.files[0];
  }

  register(){
    if(this.full_name && this.email && this.password && this.role && this.profile_img){
      this.signUpService.createUser(this.full_name, this.email, this.password, this.role, this.profile_img)
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
      this.full_name = '';
      this.email = '';
      this.password = '';
      this.role = '';
    }
  }


}
