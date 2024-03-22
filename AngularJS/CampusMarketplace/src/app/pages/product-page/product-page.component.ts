import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserData } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  public listing: any = {}; // Holds the form data
  public user: any

  constructor(private router: Router, private UserService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user
    console.log(this.user)
  

    // Initialize your listing object, if necessary
    this.initListing();
  }

  initListing() {
    if (!this.user) {
      console.warn('User data is not available');
      return;
    }
    this.listing = {
      title: '',
      condition: '',
      price: null,
      description: '',
      images_folder_path: '',
      seller_id: this.user.user_id
    };
  }

  addListing(): void {
    this.UserService.addListing( this.listing.title, this.listing.condition, this.listing.price, this.listing.description, this.listing.seller_id, this.listing.images_folder_path ).subscribe({
      next: (response: any) => {
        console.log('Listing added successfully', response);
      },
      error: (error: any) => {
        console.error('Error adding listing', error);
      }
    });
  }
}
