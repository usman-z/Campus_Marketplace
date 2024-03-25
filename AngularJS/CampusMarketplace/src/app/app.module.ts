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
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InboxComponent } from './pages/inbox/inbox.component';
import { MessageComponent } from './components/message/message.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SellComponent } from './pages/sell/sell.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ResultComponent } from './pages/result/result.component';
import { ListingComponent } from './components/listing/listing.component';
import { SellerProfileComponent } from './pages/seller-profile/seller-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ReviewPageComponent,
    ListingPageComponent,
    BackButtonComponent,
    CustomButtonComponent,
    StarRatingComponent,
    MainPageComponent,
    ProductPageComponent,
    HomePageComponent,
    ProfileComponent,
    InboxComponent,
    MessageComponent,
    ChatComponent,
    LoadingComponent,
    SellComponent,
    VerifyComponent,
    ResultComponent,
    ListingComponent,
    SellerProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
