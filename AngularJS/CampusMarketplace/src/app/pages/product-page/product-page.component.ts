import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private imageUploadService: ImageUploadService) {}

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
    console.log("Title:", this.productTitle);
    console.log("Condition:", this.productCondition);
    console.log("Price:", this.productPrice);
    console.log("Description:", this.productDescription);
    console.log("Selected Images:", this.selectedImages);
  }
}
