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
}
