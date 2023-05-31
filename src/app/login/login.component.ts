import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  pw = '';

  constructor(private auth: Auth) {}

  login(form: NgForm) {
    if(form.invalid) return;

    signInWithEmailAndPassword(this.auth, this.email, this.pw)
      .catch(err => console.error(err));
  }
}
