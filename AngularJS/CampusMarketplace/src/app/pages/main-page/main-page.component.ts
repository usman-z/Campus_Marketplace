import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  loggingIn: boolean = true;
  isLoading: boolean = true

  name: string = ''
  email: string = ''
  password: string = ''
  role: string = ''

  constructor(private router: Router) {}

  process() {
    console.log(this.name, this.email, this.password, this.role);
  }

  onChange(str: string) {
    if(str === 'loggingIn') {
      this.loggingIn = true
      this.email = ''
      this.password = ''
    }
    else {
      this.loggingIn = false
      this.name = ''
      this.email = ''
      this.password = ''
    }
  }
}
