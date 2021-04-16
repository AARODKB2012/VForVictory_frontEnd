import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestServiceLoginComponent } from './request-service-login.component';

describe('RequestServiceLoginComponent', () => {
  let component: RequestServiceLoginComponent;
  let fixture: ComponentFixture<RequestServiceLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestServiceLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestServiceLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
