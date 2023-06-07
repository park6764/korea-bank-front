import { Component } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { BankService } from '../bank.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-new',
  templateUrl: './account-new.component.html',
  styleUrls: ['./account-new.component.css']
})
export class AccountNewComponent {
  uid?: string;
  pw = '';
  money = 0;

  constructor(private auth: Auth, private bank: BankService) {
    authState(auth).subscribe(user => {
      if(user) {
        this.uid = user.uid;
      }
    });
  }

  createAccount(form: NgForm) {
    if(form.invalid) return;

    this.bank.createAccount({
      uid: this.uid!,
      password: Number(this.pw),
      money: this.money
    })
    .subscribe(b => {
      if(b) alert('계좌를 생성했습니다');
      else alert('계좌 생성에 실패했습니다.');
    })
  }
}
