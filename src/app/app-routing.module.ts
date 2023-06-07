import { NgModule, inject } from '@angular/core';
import { CanActivateFn, Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountComponent } from './account/account.component';
import { Auth } from '@angular/fire/auth';
import { AccountNewComponent } from './account-new/account-new.component';
import { AccountEditPwComponent } from './account-edit-pw/account-edit-pw.component';
import { AccountTransactionHistoryComponent } from './account-transaction-history/account-transaction-history.component';
import { IsaComponent } from './isa/isa.component';

const redirectUnauthorized: CanActivateFn = (route, state) => {
  let auth = inject(Auth);

  if(auth.currentUser) { return true; }
  else {
    alert('로그인해야 볼 수 있는 페이지입니다. 로그인 화면으로 이동합니다');
    let router = inject(Router);
    return router.parseUrl('/login');
  }
};

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'account', component: AccountComponent, canActivate: [redirectUnauthorized], children: [
    { path: 'new', component: AccountNewComponent }, // "/account/new" -> children:
    { path: 'edit-pw', component: AccountEditPwComponent }, // "/account/edit-pw"
    { path: 'transaction-history', component: AccountTransactionHistoryComponent }
  ] },
  { path: 'isa', component: IsaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
