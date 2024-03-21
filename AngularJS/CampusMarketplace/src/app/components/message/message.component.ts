import { Component, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserData } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() otherUserId: number = 0;
  @Input() activeUserId: number = 0;
  otherUser?: UserData

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUserInfo(this.otherUserId).subscribe({
      next: (response) => {
        this.otherUser = response;
      }
    })
  }

  chat() {
    this.router.navigate(['/chat'], {
      queryParams: { userId: this.activeUserId, otherId: this.otherUserId  }
    });
  }
}
