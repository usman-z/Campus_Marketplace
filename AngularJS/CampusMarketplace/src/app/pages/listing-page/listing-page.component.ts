import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss']
})
export class ListingPageComponent {

  itemSearched: string = ''
  user = {} 

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.route.queryParams.subscribe(params => {
      this.itemSearched = params['search'];
    });
    this.user = history.state.user
  }
}
