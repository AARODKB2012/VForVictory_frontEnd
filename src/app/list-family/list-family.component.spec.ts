import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFamilyComponent } from './list-family.component';

describe('ListFamilyComponent', () => {
  let component: ListFamilyComponent;
  let fixture: ComponentFixture<ListFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
