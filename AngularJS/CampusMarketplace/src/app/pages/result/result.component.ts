import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserData } from 'src/app/models/user/user.model';
import { ListingData } from 'src/app/models/listing/listing.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  listings?: ListingData[] 
  listing: any = {};
  user: any


  constructor(private router: Router, private UserService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user
    console.log(this.user)

    this.route.queryParams.subscribe(params => {
      const searchTerm = params['search'];
      console.log(searchTerm)

      this.UserService.searchListings(searchTerm).subscribe({
        next: (response) => { 
          console.log(response)
          this.listings = response;
        }
    })
    });
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
