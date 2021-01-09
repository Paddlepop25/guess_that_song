import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private userSvc: UserService) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }

  onSubmit() {
    const username = this.loginForm.get('username').value
    const password = this.loginForm.get('password').value

    this.userSvc.userLogin({username, password})

    console.log('USER IS LOGGED IN')

  }

}
