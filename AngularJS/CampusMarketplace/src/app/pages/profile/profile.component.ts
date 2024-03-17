import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user = {} 

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = history.state.user[0]
  }

}
