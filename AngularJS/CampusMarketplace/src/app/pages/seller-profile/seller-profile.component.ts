import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent {

  user: any
  seller: any
  load: boolean = true
  listings?: any[] 
  listing: any = {};

  constructor(private router: Router, private UserService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = history.state.user
    
    const sellerId = +this.route.snapshot.params['id'];
    this.UserService.getUserInfo(sellerId).subscribe({
        next: (userInfo) => {
          this.seller = userInfo;
          this.UserService.userListings(this.seller.user_id).subscribe({
            next: (response) => { 
              this.load = false;
              this.listings = response;
            }
          })
        },
        error: (error) => {
          console.error('Error fetching seller information:', error);
        }
      });
  }

  goToRate(sellerId: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
          user: this.user
      }
    };
    this.router.navigate(['/review', sellerId], navigationExtras);
  }

  goToListingDetail(listingId: number): void {
    const navigationExtras: NavigationExtras = {
        state: {
            user: this.user
        }
    };
    this.router.navigate(['/listing', listingId], navigationExtras);
}

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = Array(fullStars).fill('★');

    if (hasHalfStar) {
      stars.push('★');
    }

    const emptyStars = Array(5 - stars.length).fill('☆');
    return stars.concat(emptyStars);
  }

}
