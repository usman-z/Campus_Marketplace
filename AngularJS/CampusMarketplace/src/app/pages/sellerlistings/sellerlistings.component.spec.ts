import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerlistingsComponent } from './sellerlistings.component';

describe('SellerlistingsComponent', () => {
  let component: SellerlistingsComponent;
  let fixture: ComponentFixture<SellerlistingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerlistingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerlistingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
