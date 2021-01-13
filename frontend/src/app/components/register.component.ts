import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  
  // @ViewChild('imageFile') imageFile: ElementRef;

  registerForm: FormGroup

  constructor(private fb: FormBuilder, private userSvc: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      // image: this.fb.control('', [Validators.required])
    })
  }

  onSubmit() {
    // console.log('this.registerForm >>>> ', this.registerForm) // ok

    // const formData = new FormData();
    // formData.set('image_key', this.imageFile.nativeElement.files[0]);
    // formData.set('username', this.registerForm.get('username').value)
    // formData.set('email', this.registerForm.get('email').value)
    // formData.set('password', this.registerForm.get('password').value)

    const username = this.registerForm.get('username').value
    const email = this.registerForm.get('email').value
    const password = this.registerForm.get('password').value
    
    this.userSvc.registerUser({username, email, password} as User)
    // this.userSvc.registerUser({formData})

    this.router.navigate(['/login'])
    this.registerForm.reset()
  }
}
