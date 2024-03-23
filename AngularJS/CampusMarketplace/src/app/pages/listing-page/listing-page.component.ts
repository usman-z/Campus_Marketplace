import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/models/user/user.model';
import { ListingData } from 'src/app/models/listing/listing.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss']
})
export class ListingPageComponent {

  listing: any = {};
  user: any
  seller: any


  constructor(private router: Router, private UserService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user
    
    const listingId = +this.route.snapshot.params['id'];
    this.UserService.getListing(listingId).subscribe(listing => {
      this.listing = listing; 
      console.log(this.listing.seller_id)
      this.UserService.getUserInfo(this.listing.seller_id).subscribe({
        next: (userInfo) => {
          this.seller = userInfo;
          console.log(this.seller)
  
        },
        error: (error) => {
          console.error('Error fetching seller information:', error);
        }
      });
      console.log(this.listing.seller_id)

    });

  }

  goToSellerProfile(sellerId: number): void {
    this.router.navigate(['/profile', sellerId]);
  }
}
