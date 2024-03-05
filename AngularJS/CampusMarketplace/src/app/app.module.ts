import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ReviewPageComponent,
    ListingPageComponent,
    BackButtonComponent,
    CustomButtonComponent,
    StarRatingComponent,
    MainPageComponent,
    MainPageComponent,
    ProductPageComponent,
    LoginPageComponent,
    SignupPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
