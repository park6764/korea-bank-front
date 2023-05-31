import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  email = '';
  pw = '';

  constructor(private auth: Auth) {}

  signUp(form: NgForm) {
    if(form.invalid) return;

    createUserWithEmailAndPassword(this.auth, this.email, this.pw)
      .catch(err => console.error(err));
  }
}
