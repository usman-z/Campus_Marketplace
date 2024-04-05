import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserData } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  user?: UserData 
  itemSearched: string = ''

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user[0]

    this.slides[0] = {
      src: 'https://www.uncg.edu/wp-content/uploads/2022/10/PIC30643_Summer-2021-Campus-Aerial-11.jpg'
    };
    this.slides[1] = {
      src: '../../assets/uncg_building.jpeg',
    };
    this.slides[2] = {
      src: '../../assets/uncg_img4.jpeg'
    };
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

}
