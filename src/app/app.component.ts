import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links = [
    { name: '로그인', link: '/login' },
    { name: '회원가입', link: '/sign-up' },
    { name: '적금 계산기', link: '/isa' }
  ];

  constructor(private auth: Auth, private router: Router) {}

  logout() {
    signOut(this.auth).then(() => {
      alert('로그아웃 되었습니다.');
      this.router.navigateByUrl('/login');
    });
  }
}
