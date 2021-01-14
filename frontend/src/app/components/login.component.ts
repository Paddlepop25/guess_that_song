import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private authSvc: AuthService, 
    private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    console.log('user logged in? ', this.authSvc.isUserLoggedIn())

    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }

  onSubmit() {
    this.spinner.show();
    const username = this.loginForm.get('username').value
    const password = this.loginForm.get('password').value
    this.authSvc.login(username, password)
      .then(result => {
  
        if (result == true) {
        console.log('USER IS LOGGED IN')
          setTimeout(() => {
            console.log("delay");
            this.spinner.hide();
            this.router.navigate(['/guessthatsong'])
          }, 2000);
        }

        if (result == false) {
          console.log('User is not authenticated')
          this.spinner.hide();
          window.alert('The username / password is wrong. Please try again')
        }
      })
    this.loginForm.reset()
  }
}
