import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(private fb: FormBuilder, private userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      // image_key: this.fb.control('', []),
    })
  }

  onSubmit() {
    // console.log('this.registerForm >>>> ', this.registerForm) // ok

    const username = this.registerForm.get('username').value
    const email = this.registerForm.get('email').value
    const password = this.registerForm.get('password').value
    
    this.userSvc.registerUser({username, email, password} as User)

    this.router.navigate(['/login'])
    this.registerForm.reset()
  }
}
