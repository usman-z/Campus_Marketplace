import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrl: './edit-listing.component.scss'
})
export class EditListingComponent {
  listingId!: number;
  listing: any = {};
  user: any
  errorMessage: string = '';

  constructor(private UserService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user
    
    const listingId = +this.route.snapshot.params['id'];
    this.UserService.getListing(listingId).subscribe(listing => {
      this.listing = listing; 
    });

  }

  updateListing() {
    this.UserService.updateListing(this.listing).subscribe({
      next: () => {
        history.back();
      },
      error: () => this.errorMessage = 'Failed to update listing.'
    });
  }
}
