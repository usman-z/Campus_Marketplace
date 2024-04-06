import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent {
  user: any
  userBeingRated?: UserData
  rateUser: number = 0
  userRating: number = 0;

  constructor(private router: Router, private UserService: UserService, private location: Location, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = history.state.user
    
    const sellerId = +this.route.snapshot.params['id'];
    this.UserService.getUserInfo(sellerId).subscribe({
        next: (userInfo) => {
          this.userBeingRated = userInfo;
          this.rateUser = this.userBeingRated.user_id
          console.log(this.userBeingRated)
          console.log(this.userBeingRated.rating)

  
        },
        error: (error) => {
          console.error('Error fetching seller information:', error);
        }
      });
    
  }


  submitRating() {
    console.log(this.rateUser)
    console.log(this.userRating)
    this.UserService.rateUser(this.rateUser, this.userRating).subscribe(
      response => {
        this.router.navigate(['/feedback'], {
          queryParams: {response: "Rating submitted" }
        }).catch(error => {
          console.error('Navigation error:', error);
        });
      }
    );
    this.location.back();
  }
}
