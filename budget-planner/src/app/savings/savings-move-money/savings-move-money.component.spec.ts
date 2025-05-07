import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsMoveMoneyComponent } from './savings-move-money.component';

describe('SavingsMoveMoneyComponent', () => {
  let component: SavingsMoveMoneyComponent;
  let fixture: ComponentFixture<SavingsMoveMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavingsMoveMoneyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavingsMoveMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
