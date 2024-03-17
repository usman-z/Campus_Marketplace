import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {


  user = {}
  itemSearched: string = ''

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user[0]
  }

  search() {
    if (this.itemSearched.trim() !== '') {
      this.router.navigate(['/listing'], {
        queryParams: { search: this.itemSearched, loggedIn: '' }
      }).catch(error => {
        console.error('Navigation error:', error);
      });
    }
  }

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
