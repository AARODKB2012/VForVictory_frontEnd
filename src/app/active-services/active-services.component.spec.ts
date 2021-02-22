import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveServicesComponent } from './active-services.component';

describe('ActiveServicesComponent', () => {
  let component: ActiveServicesComponent;
  let fixture: ComponentFixture<ActiveServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
