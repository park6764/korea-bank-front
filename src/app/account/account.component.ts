import { Component } from '@angular/core';
import { Account, BankService } from '../bank.service';
import { Auth, authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  accounts?: Observable<Account[]>;
  uid?: string;

  constructor(private bank: BankService, private auth: Auth) {
    authState(auth).subscribe(u => {
      if(u) {
        this.uid = u.uid;
        this.accounts = bank.getAllAccounts(this.uid);
      }
    });
  }

  deleteAccount(accountId: number) {
    this.bank.deleteAccount(accountId)
      .subscribe({ next: b => {
        if(b) {
          alert('정상적으로 계좌가 삭제되었습니다.');
          this.accounts = this.bank.getAllAccounts(this.uid!);
        } else alert('계좌 삭제가 실패했습니다.');
      }, error: console.error });
  }

  addMoney(account: Account) {
    const moneyToPut = Number(window.prompt('입금할 금액을 입력하세요.'));

    this.bank.createTransactionHistory({
      toAccountId: account.id,
      commitTime: Date.now(),
      money: moneyToPut,
      accountPassword: account.password
    })
    .subscribe({ next: b => {
      if(b) {
        alert('정상적으로 입금되었습니다.');
        this.accounts = this.bank.getAllAccounts(this.uid!);
      } else alert('입금이 실패했습니다.');
    }, error: console.error });
  }

  deposit(account: Account) {
    const moneyToPut = Number(window.prompt('출금할 금액을 입력하세요.'));

    if(account.money < moneyToPut) { alert('잔액이 부족합니다.'); return; }

    this.bank.createTransactionHistory({
      fromAccountId: account.id,
      commitTime: Date.now(),
      money: moneyToPut,
      accountPassword: account.password
    })
    .subscribe({ next: b => {
      if(b) {
        alert('정상적으로 출금되었습니다.');
        this.accounts = this.bank.getAllAccounts(this.uid!);
      } else alert('출금이 실패했습니다.');
    }, error: console.error });
  }

  send(account: Account) {
    const toAccountId = Number(window.prompt('송금할 계좌의 ID를 입력하세요.'));
    const moneyToPut = Number(window.prompt('출금할 금액을 입력하세요.'));

    if(account.money < moneyToPut) { alert('잔액이 부족합니다.'); return; }

    this.bank.createTransactionHistory({
      fromAccountId: account.id,
      toAccountId: toAccountId,
      commitTime: Date.now(),
      money: moneyToPut,
      accountPassword: account.password
    })
    .subscribe({ next: b => {
      if(b) {
        alert('정상적으로 송금되었습니다.');
        this.accounts = this.bank.getAllAccounts(this.uid!);
      } else alert('송금이 실패했습니다.');
    }, error: console.error });
  }
}
