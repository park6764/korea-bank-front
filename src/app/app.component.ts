import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links = [
    { name: '로그인', link: '/login' },
    { name: '회원가입', link: '/sign-up' },
  ];

  constructor(private auth: Auth) {}

  logout() {
    signOut(this.auth);
  }
}
