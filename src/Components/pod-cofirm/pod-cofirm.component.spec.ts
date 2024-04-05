import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PODCOFIRMComponent } from './pod-cofirm.component';

describe('PODCOFIRMComponent', () => {
  let component: PODCOFIRMComponent;
  let fixture: ComponentFixture<PODCOFIRMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PODCOFIRMComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PODCOFIRMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
