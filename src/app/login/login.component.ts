import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user = { email: '', password: '' };

  constructor() { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    const email = form.value.email
    const password = form.value.password


  }

}
