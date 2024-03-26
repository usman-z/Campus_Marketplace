import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { PersonnelData } from 'src/app/models/personnel/personnel.model';
import { ImageUploadService } from 'src/app/services/images/image-upload.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  user?: PersonnelData

  productTitle: string = "";
  productCondition: string = "";
  productPrice: number = 0;
  productDescription: string = "";
  selectedImages: File[] = [];
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if (history.state.user == undefined) {
      this.router.navigate(['/']);
    }
    this.user = history.state.user
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedImages.push(files[i]);
      }
    }
  }

  addProduct() {
    if(this.productTitle && this.productCondition && this.productPrice && this.productDescription && this.user?.user_id && this.selectedImages){

      this.userService.addListing(this.productTitle, this.productCondition, this.productPrice, this.productDescription, this.user?.user_id, this.selectedImages)
        .subscribe(()=>{
          const navigationExtras: NavigationExtras = {
            state: {
                user: this.user
            }
          };
          console.log(this.user);
          this.router.navigate(['/profile'], navigationExtras);
        });
    }else{
      this.errorMessage = 'All information is needed';
      setTimeout(()=>{
        this.errorMessage ='';
      }, 4000);
    }
  }
}
