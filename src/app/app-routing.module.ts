import { NgModule, inject } from '@angular/core';
import { CanActivateFn, Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountComponent } from './account/account.component';
import { Auth } from '@angular/fire/auth';

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
  { path: 'account', component: AccountComponent, canActivate: [redirectUnauthorized] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
