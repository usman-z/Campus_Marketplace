import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  listings?: any[] 
  listing: any = {};
  user: any
  load: boolean = true
  itemSearched: string = ''


  constructor(private router: Router, private UserService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user

    this.route.queryParams.subscribe(params => {
      const searchTerm = params['search'];
      this.itemSearched = searchTerm

      if(searchTerm == 'all') {
        this.UserService.getAllListings().subscribe({
          next: (response) => { 
            this.load = false;
            this.listings = response;
          }
        })
      }
      else {
        this.UserService.searchListings(searchTerm).subscribe({
          next: (response) => { 
            this.load = false;
            this.listings = response;
          }
        })
      }
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
