import { Component } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  user = {}
  itemSearched: string = ''

  chat() {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['/inbox'], navigationExtras);
  }

  profile () {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['/profile'], navigationExtras);
  }
}


