import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPageComponent } from './listing-page.component';

describe('ListingPageComponent', () => {
  let component: ListingPageComponent;
  let fixture: ComponentFixture<ListingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListingPageComponent]
    });
    fixture = TestBed.createComponent(ListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
