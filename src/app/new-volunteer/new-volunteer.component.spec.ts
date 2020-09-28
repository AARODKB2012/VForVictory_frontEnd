import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVolunteerComponent } from './new-volunteer.component';

describe('NewVolunteerComponent', () => {
  let component: NewVolunteerComponent;
  let fixture: ComponentFixture<NewVolunteerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVolunteerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
