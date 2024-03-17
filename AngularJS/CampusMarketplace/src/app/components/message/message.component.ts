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
  @Input() message_id: number = 0
  @Input() message: string = '';
  @Input() message_time: string = '';
  @Input() other_id: number = 0;

  @Input() activeUser: number = 0;
  otherUser?: UserData

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUserInfo(this.other_id).subscribe({
      next: (response) => {
        this.otherUser = response;
      }
    })
  }

  chat() {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.activeUser
      }
    };
    this.router.navigate(['/chat'], navigationExtras);
  }
}
