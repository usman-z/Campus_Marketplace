import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {

  userId: number = 0
  user?: UserData
  approved: boolean = false
  message: string = ''
  
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      if (this.userId == undefined) {
        this.router.navigate(['/']);
      }

      this.userService.getUserInfo(this.userId).subscribe({
        next: (response) => {
          this.user = response;
        }
      });
    });
  }

  submit() {
    if(this.approved == true) {
      this.userService.verifyUser(this.userId).subscribe();
      this.message = "Approval Successful!"
    }
    else {
      this.message = "Approval failed!"
    }
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2300);
  }
}