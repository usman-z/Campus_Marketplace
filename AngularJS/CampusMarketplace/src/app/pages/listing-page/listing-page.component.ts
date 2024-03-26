import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserData } from 'src/app/models/user/user.model';
import { ListingData } from 'src/app/models/listing/listing.model';
import { ChatData } from 'src/app/models/messages/chat.model';
import { PersonnelData } from 'src/app/models/personnel/personnel.model';
import { ChatService } from 'src/app/services/inbox/chat.service';
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
    const navigationExtras: NavigationExtras = {
      state: {
          user: this.user
      }
    };
    console.log(this.user);
    this.router.navigate(['/sellerProfile', sellerId], navigationExtras);
  }
  

  sendMessage(sender_id: number, receiver_id: number, message: string): void {
    this.MessageService.sendMessage(sender_id, receiver_id, message).subscribe({
        next: (response) => {
            console.log('Message sent:', response);
        },
        error: (error) => {
            console.error('Error sending message:', error);
        }
    });
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['/inbox'], navigationExtras);
  }

}
