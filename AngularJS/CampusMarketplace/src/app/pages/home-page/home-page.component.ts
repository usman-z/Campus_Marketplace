import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserData } from 'src/app/models/user/user.model';
import { InboxService } from 'src/app/services/inbox/inbox.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  user?: UserData 
  itemSearched: string = ''
  initialMessageCount: number = 0
  messageCount: number = 0
  startingCount: number = 0
  private intervalId: any;

  slides: any[] = new Array(2).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor(private router: Router, private route: ActivatedRoute, private inboxService: InboxService) {}

  ngOnInit() {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user[0]

    if(this.user) {
      this.inboxService.getMessageCount(this.user.user_id).subscribe(
        (response) => {
          this.initialMessageCount = response.count;
          this.startingCount = response.count;
        }
      )
    }

    this.intervalId = setInterval(() => {
      if(this.user) {
        this.inboxService.getMessageCount(this.user.user_id).subscribe(
          (response) => {
            if(response.count > this.initialMessageCount){
              this.messageCount = this.initialMessageCount - this.startingCount + (response.count - this.initialMessageCount);
            }
            this.initialMessageCount = response.count;
          }
        )
      }
    }, 1000);

    this.slides[0] = {
      src: 'https://www.uncg.edu/wp-content/uploads/2022/10/PIC30643_Summer-2021-Campus-Aerial-11.jpg'
    };
    this.slides[1] = {
      src: '../../assets/uncg_building.jpeg',
    };
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  search() {
    if (this.itemSearched.trim() !== '') {
      const navigationExtras: NavigationExtras = {
        state: {
          user: this.user
        },
        queryParams: {
          search: this.itemSearched.trim()
        }
      };
      this.router.navigate(['/result'], navigationExtras);
    }
  }

  chat() {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['/inbox'], navigationExtras);
  }

  profile () {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['/profile'], navigationExtras);
  }

  allListings() {
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      },
      queryParams: {
        search: 'all'
      }
    };
    this.router.navigate(['/result'], navigationExtras);
  }

}
