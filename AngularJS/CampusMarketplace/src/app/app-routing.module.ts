import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { ListingPageComponent } from './pages/listing-page/listing-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InboxComponent } from './pages/inbox/inbox.component';
import { ChatComponent } from './components/chat/chat.component';
import { SellComponent } from './pages/sell/sell.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { VerifyComponent } from './components/verify/verify.component';
import { ResultComponent } from './pages/result/result.component';
import { ListingComponent } from './components/listing/listing.component';
import { SellerProfileComponent } from './pages/seller-profile/seller-profile.component';
import { SellerlistingsComponent } from './pages/sellerlistings/sellerlistings.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'review/:id', component: ReviewPageComponent },
  { path: 'listing/:id', component: ListingPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'sell', component: SellComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'result', component: ResultComponent },
  { path: 'listing', component: ListingComponent },
  { path: 'sellerProfile/:id', component: SellerProfileComponent },
  { path: 'sellerListings', component: SellerlistingsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
