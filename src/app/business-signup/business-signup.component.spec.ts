import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSignupComponent } from './business-signup.component';

describe('BusinessSignupComponent', () => {
  let component: BusinessSignupComponent;
  let fixture: ComponentFixture<BusinessSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
