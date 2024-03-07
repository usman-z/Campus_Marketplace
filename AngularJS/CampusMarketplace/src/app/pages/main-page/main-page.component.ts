import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service'

import { Router } from '@angular/router';

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
  error: string = ''
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  process() {
    console.log(this.email, this.password);
  }


  onSubmitRegister(){
    if((this.first_name && this.last_name && this.email && this.password && this.role) != ''){
      this.userService.registerUser(this.first_name,this.last_name, this.email, this.password, this.role).subscribe(
        response =>{
          this.successMessage = 'You have successfully registered! You can now log in. ';
          setTimeout(() => {
            this.successMessage ='';
            this.router.navigate(['']).catch( error => {
              console.error('Navigation error')
            });
          }, 5000); // 3 secs it displays the message
        }, error => {
          console.error('Registration error:', error);
          this.error = 'Registration failed. Please try again.';
        }
      );
    }
    else{
      this.error = 'All information is required!'
    }
  }

  onSubmitLogIn(){

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
