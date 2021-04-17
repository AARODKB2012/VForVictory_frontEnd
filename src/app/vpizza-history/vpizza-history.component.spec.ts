import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpizzaHistoryComponent } from './vpizza-history.component';

describe('VpizzaHistoryComponent', () => {
  let component: VpizzaHistoryComponent;
  let fixture: ComponentFixture<VpizzaHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpizzaHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpizzaHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
