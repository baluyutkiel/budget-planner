import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsActivityComponent } from './savings-activity.component';

describe('SavingsActivityComponent', () => {
  let component: SavingsActivityComponent;
  let fixture: ComponentFixture<SavingsActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavingsActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavingsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
