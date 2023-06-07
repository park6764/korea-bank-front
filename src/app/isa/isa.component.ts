import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { BankService } from '../bank.service';

@Component({
  selector: 'app-isa',
  templateUrl: './isa.component.html',
  styleUrls: ['./isa.component.css']
})
export class IsaComponent {
  inputMoney = 0;
  monthes = 0;
  iRate = 0;

  constructor(private auth: Auth, private bank: BankService) {}

  interest(): number {
    let sum = 0;
    for (let i = this.monthes; i > 0; i--) {
      sum += this.inputMoney * (this.iRate / 100) * (i / this.monthes);
    }
    return sum;
  }
}

/*
TODO: ISA TransactionHistory 만들기
TODO: ISA 금리 적용 
*/