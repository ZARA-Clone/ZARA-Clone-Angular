import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutWarningComponent } from './checkout-warning.component';

describe('CheckoutWarningComponent', () => {
  let component: CheckoutWarningComponent;
  let fixture: ComponentFixture<CheckoutWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutWarningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
