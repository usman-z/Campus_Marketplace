import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ReviewPageComponent,
    ListingPageComponent,
    BackButtonComponent,
    CustomButtonComponent,
    StarRatingComponent,
    MainPageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
