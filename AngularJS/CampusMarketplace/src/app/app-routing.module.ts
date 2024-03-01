import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
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
