import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MessageService } from 'src/app/services/inbox/message.service';
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
  load: boolean = true

  constructor(private router: Router, private MessageService: MessageService, private UserService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user
    
    const listingId = +this.route.snapshot.params['id'];
    this.UserService.getListing(listingId).subscribe(listing => {
      this.listing = listing; 
      this.UserService.getUserInfo(this.listing.seller_id).subscribe({
        next: (userInfo) => {
          this.seller = userInfo;
        },
        error: (error) => {
          console.error('Error fetching seller information:', error);
        }
      });
    });

  }

  
  goToSellerProfile(sellerId: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
          user: this.user
      }
    };
    this.router.navigate(['/sellerProfile', sellerId], navigationExtras);
  }
  

  sendMessage(sender_id: number, receiver_id: number, message: string): void {
    this.MessageService.sendMessage(sender_id, receiver_id, message).subscribe({
        next: (response) => {
            
        },
        error: (error) => {
            console.error('Error sending message:', error);
        }
    });
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      },
      queryParams: {
        userId: this.user.user_id,
        otherId: this.seller.user_id
      }
    };
    this.router.navigate(['/chat'], navigationExtras);
  }

  markSold(listingId: number) {
    this.UserService.markItemSold(listingId).subscribe({
      next: () => {
        const navigationExtras: NavigationExtras = {
          state: {
            user: this.user
          }
        };
        this.router.navigate(['/sellerListings'], navigationExtras);
      }
  });
  }

  
  editListing(listingId: number): void {
    const navigationExtras: NavigationExtras = {
        state: {
            user: this.user
        }
    };
    this.router.navigate(['/editListing', listingId], navigationExtras);
  }
}
