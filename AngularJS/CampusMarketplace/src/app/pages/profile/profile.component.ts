import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserData } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user = {} 

  constructor(private router: Router, private UserService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user
    console.log(this.user)
  }

  product () {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    console.log(history.state.user[0])
    this.router.navigate(['/product'], navigationExtras);
  }

  logOut() {
    this.router.navigate(['/']);
  }

}
