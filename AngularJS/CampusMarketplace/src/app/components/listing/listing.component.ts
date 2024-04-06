import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent {
  @Input() listing_id : number = 0
  @Input() title: string = ''
  @Input() condition: string = ''
  @Input() price: number = 0
  @Input() description: string = ''
  @Input() seller_id: number = 0
  @Input() images_folder_path: string = ''
  @Input() listing_time: string = ''
  @Input() sold: boolean = false
  

  constructor() {}


}
