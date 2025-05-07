import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardExpenseComponent } from './dashboard-expense.component';

describe('DashboardExpenseComponent', () => {
  let component: DashboardExpenseComponent;
  let fixture: ComponentFixture<DashboardExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardExpenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
