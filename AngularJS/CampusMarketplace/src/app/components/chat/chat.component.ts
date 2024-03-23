import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatData } from 'src/app/models/messages/chat.model';
import { PersonnelData } from 'src/app/models/personnel/personnel.model';
import { ChatService } from 'src/app/services/inbox/chat.service';
import { MessageService } from 'src/app/services/inbox/message.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  allMessages?: ChatData[]
  load: boolean = true

  activeUser?: PersonnelData
  otherUser?: PersonnelData
  newMessage: string = ''

  constructor(private route: ActivatedRoute, private chatService: ChatService, private userService: UserService, private messageService: MessageService) {}

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

      this.userService.getUserInfo(activeUserId).subscribe({
        next: (response) => {
          this.activeUser = response;
        }
      })

      this.userService.getUserInfo(otherUserId).subscribe({
        next: (response) => {
          this.otherUser = response;
        }
      })
    });
  }

  sendMessage() {
    if (this.activeUser && this.otherUser) {
      this.messageService.sendMessage(this.activeUser.user_id, this.otherUser.user_id, this.newMessage).subscribe(() => {
        this.newMessage = '';
      });
    }

  }
}
