import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTransactionHistoryComponent } from './account-transaction-history.component';

describe('AccountTransactionHistoryComponent', () => {
  let component: AccountTransactionHistoryComponent;
  let fixture: ComponentFixture<AccountTransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountTransactionHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
