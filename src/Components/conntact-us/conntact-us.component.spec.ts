import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConntactUsComponent } from './conntact-us.component';

describe('ConntactUsComponent', () => {
  let component: ConntactUsComponent;
  let fixture: ComponentFixture<ConntactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConntactUsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConntactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
