import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveFamilyComponent } from './active-family.component';

describe('ActiveFamilyComponent', () => {
  let component: ActiveFamilyComponent;
  let fixture: ComponentFixture<ActiveFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
