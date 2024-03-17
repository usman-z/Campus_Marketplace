import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  user = {}

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = history.state.user[0]
  }

  search() {

  }

  logout() {
    this.router.navigate(['/']);
  }

  userProfile() {

  }
}
