import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
  lastTime: string = ''

  activeUser?: PersonnelData
  otherUser?: PersonnelData
  newMessage: string = ''
  messageEmailSent: boolean = false
  intervalId: any

  constructor(private router: Router,private route: ActivatedRoute, private chatService: ChatService, private userService: UserService, private messageService: MessageService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const activeUserId = params['userId'];
      const otherUserId = params['otherId'];

      this.loadMessages(activeUserId, otherUserId);
      this.load = false;

      this.intervalId = setInterval(() => {
        this.loadMessages(activeUserId, otherUserId);
      }, 1000);

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

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const messagesContainer = document.getElementById('messagesContainer');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 200);
  }

  sendMessage() {
    if (this.activeUser && this.otherUser) {
      this.messageService.sendMessage(this.activeUser.user_id, this.otherUser.user_id, this.newMessage).subscribe(() => {
        this.scrollToBottom();
        this.newMessage = '';
        if(this.activeUser && this.otherUser && this.messageEmailSent == false) {
          this.messageService.sendMessageEmail(this.activeUser.user_id, this.otherUser.user_id).subscribe(() => {
            this.messageEmailSent = true
          })
        }
      });
    }
  }

  formatTimeStamp(timestamp: string): string {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/New_York', // Set the timezone to EST
      hour12: true, // Use 12-hour format (AM/PM)
      month: '2-digit', // Display month as two digits (MM)
      day: '2-digit', // Display day as two digits (DD)
      year: 'numeric', // Display year in full (YYYY)
      hour: '2-digit', // Display hour as two digits (HH)
      minute: '2-digit' // Display minute as two digits (MM)
    };
    
    const timeString = date.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
    const dateString = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  
    return `${timeString}, ${dateString}`;
  }

  loadMessages(activeUserId: number, otherUserId: number): void {
    if (this.allMessages) {
      this.chatService.getChat(activeUserId, otherUserId).subscribe({
        next: (response) => {
          if (this.allMessages) {
            if (response.length > this.allMessages.length) {
              this.allMessages = response;
              this.scrollToBottom();
            }
            if (this.allMessages.length > 0) {
              this.lastTime = this.formatTimeStamp(this.allMessages[this.allMessages.length - 1].message_time);
            }
          }
        },
        error: (error) => {
          console.error('Error fetching messages:', error);
        }
      });
    }
    else {
      this.chatService.getChat(activeUserId, otherUserId).subscribe({
        next: (response) => {
          this.allMessages = response;
          this.scrollToBottom();
          if (this.allMessages.length > 0) {
            this.lastTime = this.formatTimeStamp(this.allMessages[this.allMessages.length - 1].message_time);
          }
        },
        error: (error) => {
          console.error('Error fetching messages:', error);
        }
      });
    }
  }

  goToSellerProfile(sellerId?: number): void {
    const navigationExtras: NavigationExtras = {
      state: {
          user: this.activeUser
      }
    };
    this.router.navigate(['/sellerProfile', sellerId], navigationExtras);
  }
}
