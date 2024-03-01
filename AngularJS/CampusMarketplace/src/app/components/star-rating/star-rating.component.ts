// star-rating.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() submit: EventEmitter<number> = new EventEmitter<number>();

  fillStars(index: number): string {
    if (index < this.rating) {
      return 'filled';
    } else {
      return 'empty';
    }
  }

  setRating(index: number): void {
    this.rating = index + 1;
    this.ratingChange.emit(this.rating);
  }
}