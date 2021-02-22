import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyApplicationComponent } from './family-application.component';

describe('FamilyApplicationComponent', () => {
  let component: FamilyApplicationComponent;
  let fixture: ComponentFixture<FamilyApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
