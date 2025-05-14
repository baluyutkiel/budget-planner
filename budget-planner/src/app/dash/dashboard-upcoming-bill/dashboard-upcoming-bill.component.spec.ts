import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUpcomingBillComponent } from './dashboard-upcoming-bill.component';

describe('DashboardUpcomingBillComponent', () => {
  let component: DashboardUpcomingBillComponent;
  let fixture: ComponentFixture<DashboardUpcomingBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardUpcomingBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardUpcomingBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
