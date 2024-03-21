import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatData } from 'src/app/models/messages/chat.model';
import { ChatService } from 'src/app/services/inbox/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  allMessages?: ChatData[]
  load: boolean = true

  constructor(private router: Router, private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const activeUserId = params['userId'];
      const otherUserId = params['otherId'];

      this.chatService.getChat(activeUserId,otherUserId).subscribe({
        next: (response) => {
          this.load = false;
          this.allMessages = response;
        }
      })
    });
  }
}
