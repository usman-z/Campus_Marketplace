import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserData } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent {

  userBeingRated?: UserData
  rateUser: number = 0
  loggedIn: string = ''
  userRating: number = 0;

  constructor(private router: Router, private UserService: UserService, private route: ActivatedRoute) {}


  submitRating() {
    
  }
}
