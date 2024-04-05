import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.scss'
})
export class FrontPageComponent {

  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/main']);
  }

}
