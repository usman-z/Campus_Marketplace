import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewViewComponent } from './pages/review-page/review-page.component';
import { ListingViewComponent } from './pages/listing-page/listing-page.component';

const routes: Routes = [
  { path: 'review', component: ReviewViewComponent }
  { path: 'listing', component: ListingViewComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
