import { Component } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { BankService } from '../bank.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-account-edit-pw',
  templateUrl: './account-edit-pw.component.html',
  styleUrls: ['./account-edit-pw.component.css']
})
export class AccountEditPwComponent {
  uid?: string;
  accountId: number;
  pw = '';

  constructor(private auth: Auth, private bank: BankService, private route: ActivatedRoute) { // requastParam할 때 값을 받아올 때 route 사용.
    authState(auth).subscribe(u => {
      if(u) { this.uid = u.uid; }
    });

    this.accountId = route.snapshot.queryParams['accountId']; // 현재 라우트 값을 받는 법
  }

  editPw(form: NgForm) {
    if(form.invalid) return;

    this.bank.editAccountPw(this.uid!, this.accountId, Number(this.pw))
    .subscribe(b => {
      if(b) alert('계좌 비밀번호가 변경되었습니다.');
      else alert('계좌 비밀번호 변경이 실패했습니다.');
    });
  }
}
