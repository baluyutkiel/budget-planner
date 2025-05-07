import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsTransactionsComponent } from './savings-transactions.component';

describe('SavingsTransactionsComponent', () => {
  let component: SavingsTransactionsComponent;
  let fixture: ComponentFixture<SavingsTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavingsTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavingsTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
