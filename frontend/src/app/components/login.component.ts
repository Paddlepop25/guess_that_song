import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {

    // console.log(this.authSvc.isUserLoggedIn())

    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }

  onSubmit() {
    const username = this.loginForm.get('username').value
    const password = this.loginForm.get('password').value

    this.authSvc.login(username, password)
      .then(result => {
        if (result == true) {
        console.log('USER IS LOGGED IN')
          this.router.navigate(['/guessthatsong'])
        }

        if (result == false) {
          console.log('User is not authenticated')
          this.router.navigate(['/register'])
        }
      })
    this.loginForm.reset()
  }
}
