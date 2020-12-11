import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServicerequestsComponent } from './list-servicerequests.component';

describe('ListServicerequestsComponent', () => {
  let component: ListServicerequestsComponent;
  let fixture: ComponentFixture<ListServicerequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListServicerequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServicerequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
