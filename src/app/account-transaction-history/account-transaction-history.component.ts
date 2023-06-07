import { Component } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { BankService, TransactionHistory } from '../bank.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-transaction-history',
  templateUrl: './account-transaction-history.component.html',
  styleUrls: ['./account-transaction-history.component.css']
})
export class AccountTransactionHistoryComponent {
  uid?: string;
  accountId: number;
  histories?: Observable<TransactionHistory[]>
  
  constructor(private auth: Auth, private bank: BankService, private route: ActivatedRoute) { // requastParam할 때 값을 받아올 때 route 사용.
    this.accountId = route.snapshot.queryParams['accountId']; // 현재 라우트 값을 받는 법

    authState(auth).subscribe(u => {
      if(u) {
        this.uid = u.uid;
        this.histories = bank.getAllTransactionHistory(this.uid, this.accountId);
      }
    });
  }
}
