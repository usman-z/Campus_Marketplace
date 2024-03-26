import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { PersonnelData } from 'src/app/models/personnel/personnel.model';
import { UserData } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent {

  user: any
  seller: any

  constructor(private router: Router, private UserService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = history.state.user
    
    const sellerId = +this.route.snapshot.params['id'];
    this.UserService.getUserInfo(sellerId).subscribe({
        next: (userInfo) => {
          this.seller = userInfo;
          console.log(this.seller)
  
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
    console.log(this.user);
    this.router.navigate(['/review', sellerId], navigationExtras);
  }

}
