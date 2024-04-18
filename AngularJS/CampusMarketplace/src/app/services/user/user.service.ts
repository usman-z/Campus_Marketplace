import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingData } from 'src/app/models/listing/listing.model';
import { PersonnelData } from 'src/app/models/personnel/personnel.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfo(userId: number){
    const url = 'https://uncgmarketplace.com:4443/info';
    const request ={
      "userId": userId
    }

    return this.http.post<PersonnelData>(url, request);

  };

  rateUser(user_id: number, rating: number) {
    const url = 'https://uncgmarketplace.com:4443/rate';

    const request = {
      "userId": user_id,
      "newRating": rating
    };

    return this.http.post<PersonnelData>(url, request);
  };

  addListing(title: string, condition: string, price: number, description: string, seller_id: number, images: File[]) {
    const url = 'https://uncgmarketplace.com:4443/addListing';

    const formData = new FormData();
    formData.append('title', title);
    formData.append('condition', condition);
    formData.append('price', String(price));
    formData.append('description', description);
    formData.append('seller_id', String(seller_id));
    for(let img of images){
      formData.append('images', img);
    }

    return this.http.post<any>(url, formData);
  }

  verifyUser(userToVerify: number) {
    const url = 'https://uncgmarketplace.com:4443/verify';

    const request = {
      "userId": userToVerify,
    };

    return this.http.post(url, request);
  }

  deleteUser(userToDelete: number) {
    const url = 'https://uncgmarketplace.com:4443/removeUser';
    const request = {
      "userId": userToDelete,
    };

    return this.http.post(url, request);
  }

  searchListings(searchTerm: string) {
    const url = 'https://uncgmarketplace.com:4443/search';
    const request = {
        "searchTerm": searchTerm
    };

    return this.http.post<ListingData[]>(url, request);
  }

  getAllListings() {
    const url = 'https://uncgmarketplace.com:4443/allListings';
    return this.http.get<any[]>(url);
  }

  userListings(userId: number) {
    const url = 'https://uncgmarketplace.com:4443/getUserListings';
    const request = {
        "userId": userId
    };

    return this.http.post<ListingData[]>(url, request);
  }

  getListing(listingId: number) {
    const url = 'https://uncgmarketplace.com:4443/getListing';
    const request = {
        "id": listingId
    };

    return this.http.post<ListingData[]>(url, request);
  }

  markItemSold(listingId: number) {
    const url = 'https://uncgmarketplace.com:4443/markItemSold';
    const request = {
        "listingId": listingId
    };

    return this.http.post(url, request);
  }

  updateListing(ListingData : ListingData) {
    const url = 'http://localhost:8080/updateListing';
    const request = {
      "listing_id" : ListingData.listing_id, 
      "title" :  ListingData.title , 
      "condition" :  ListingData.condition, 
      "price" :  ListingData.price, 
      "description" :  ListingData.description
    };

    return this.http.post<ListingData[]>(url, request);
  }
}
