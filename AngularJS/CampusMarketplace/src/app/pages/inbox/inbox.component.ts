import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageData } from 'src/app/models/messages/message.model';
import { UserData } from 'src/app/models/user/user.model';
import { InboxService } from 'src/app/services/inbox/inbox.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent {
  user?: UserData
  messages?: MessageData[]
  load: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private inboxService: InboxService) {}

  ngOnInit() {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    else {
      this.user = history.state.user;
      if(this.user != null || this.user !=undefined) {
        let user_id: number = this.user.user_id
        this.inboxService.getInbox(user_id).subscribe({
          next: (response: MessageData[]) => {
                this.messages = response;
                this.load = false;
          }
        });
  
        setInterval(() => {
          this.loadInbox(user_id);
        }, 100);
      }
    }
  }

  loadInbox(user_id: number) {
    this.inboxService.getInbox(user_id).subscribe({
      next: (response: MessageData[]) => {
        if (this.messages) {
          if (response.length > this.messages.length) {
            this.messages = response;
          }
        }
      }
    });
  }
}
