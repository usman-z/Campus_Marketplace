import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';

const routes: Routes = [
  { path: 'review', component: ReviewPageComponent },
  { path: 'listing', component: ListingPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
