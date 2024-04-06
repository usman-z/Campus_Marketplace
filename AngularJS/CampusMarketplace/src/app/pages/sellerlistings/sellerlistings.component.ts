import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sellerlistings',
  templateUrl: './sellerlistings.component.html',
  styleUrl: './sellerlistings.component.scss'
})
export class SellerlistingsComponent {
  listings?: any[] 
  listing: any = {};
  user: any
  load: boolean = true


  constructor(private router: Router, private UserService: UserService, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user

    this.UserService.userListings(this.user.user_id).subscribe({
      next: (response) => { 
        this.load = false;
        this.listings = response;
      }
    })
  }

  goToListingDetail(listingId: number): void {
    const navigationExtras: NavigationExtras = {
        state: {
            user: this.user
        }
    };
    this.router.navigate(['/listing', listingId], navigationExtras);
}

}


