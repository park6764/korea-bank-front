import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, pipe } from 'rxjs';

export interface AccountRecord {
  uid: string,
  password: number,
  money: number
}

export interface Account {
  id: number,
  uid: string,
  password: number,
  money: number
}

export interface TransactionHistoryRecord {
  fromAccountId?: number,
  toAccountId?: number,
  commitTime: number,
  money: number,
  accountPassword: number
}

export interface TransactionHistory {
  id: number,
  fromAccountId?: number,
  toAccountId?: number,
  commitTime: number,
  money: number
}

export interface ISARecord {
  uid: string,
  password: number,
  money: number,
  createdDate: number,
  dueDate: number,
  remainingCount: number,
  interval: number,
  moneyToPut: number,
  fromAccountId: number
}

export interface ISA {
  id: number,
  uid: string,
  password: number,
  money: number,
  createdDate: number,
  dueDate: number,
  remainingCount: number,
  interval: number,
  moneyToPut: number,
  fromAccountId: number,
  penalties: number
}

@Injectable({
  providedIn: 'root'
})
export class BankService {
  readonly root = 'http://localhost:8080';
  readonly transactionHistory = `${this.root}/transaction-history`;
  readonly isa = `${this.root}/account/installment-saving`;

  constructor(private http: HttpClient) {}

  createAccount(account: AccountRecord): Observable<boolean> {
    return this.http.put(`${this.root}/account`, account, { observe: 'response' })
      .pipe(map(res => res.ok));
  }

  getAllAccounts(uid: string): Observable<Account[]> {
    return this.http.get<Account[]>(this.root + '/account?uid=' + uid);
  }

  deleteAccount(accountId: number): Observable<boolean> {
    return this.http.delete(`${this.root}/account?accountId=${accountId}`, { observe: 'response' })
      .pipe(map(res => res.ok));
  }

  editAccountPw(uid: string, accountId: number, newPw: number): Observable<boolean> {
    return this.http.post(`${this.root}/account`, null, {
      params: { 'uid': uid, 'accountId': accountId, 'newPw': newPw },
      observe: 'response'
    }).pipe(map(res => res.ok));
  }

  createTransactionHistory(history: TransactionHistoryRecord): Observable<boolean> {
    return this.http.put(this.transactionHistory, history, { observe: 'response' })
      .pipe(map(res => res.ok));
  }

  getAllTransactionHistory(uid: string, accountId?: number): Observable<TransactionHistory[]> {
    return this.http.get<TransactionHistory[]>(`${this.transactionHistory}?uid=${uid}` + (accountId !== undefined ? `&accountId=${accountId}` : ''));
  }

  createISA(isa: ISARecord): Observable<boolean> {
    return this.http.put(this.isa, isa, { observe: 'response' })
      .pipe(map(res => res.ok));
  }

  getAllISA(uid: string): Observable<ISA[]> {
    return this.http.get<ISA[]>(`${this.isa}?uid=${uid}`);
  }

  tryDeposit(isaId: number): Observable<boolean> {
    return this.http.get(`${this.isa}/tryDeposit?id=${isaId}`, { observe: 'response' })
      .pipe(map(res => res.ok));
  }

  editISAInfo(uid: string, accountId: number, newPw?: number, fromAccountId?: number): Observable<boolean> {
    return this.http.post(
      `${this.isa}?uid=${uid}&accountId=${accountId}`
      + (newPw !== undefined ? `&newPw=${newPw}` : '')
      + (fromAccountId !== undefined ? `&fromAccountId=${fromAccountId}` : ''), null, { observe: 'response' })
      .pipe(map(res => res.ok));
  }

  deleteISA(isaId: number): Observable<boolean> {
    return this.http.delete(`${this.isa}?id=${isaId}`, { observe: 'response' })
      .pipe(map(res => res.ok));
  }
}
