import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  
  @ViewChild('imageFile') imageFile: ElementRef;

  registerForm: FormGroup

  constructor(private fb: FormBuilder, private userSvc: UserService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      'image-file': this.fb.control('', [Validators.required])
    })
  }

  onSubmit() {
    // console.log('this.registerForm >>>> ', this.registerForm) // ok

    // const username = this.registerForm.get('username').value
    // const email = this.registerForm.get('email').value
    // const password = this.registerForm.get('password').value

    const formData = new FormData();
    formData.append('upload', this.imageFile.nativeElement.files[0]);
    formData.append('username', this.registerForm.get('username').value)
    formData.append('email', this.registerForm.get('email').value)
    formData.append('password', this.registerForm.get('password').value)
    
    // this.userSvc.registerUser({username, email, password} as User)
    // this.userSvc.registerUser({formData})

    const result = this.http.post('http://localhost:3000/register', formData)
    .toPromise()
    .catch((error:HttpErrorResponse) => {
      console.error('ERROR in registering user ---> ', error)
    })

    this.router.navigate(['/login'])
    this.registerForm.reset()
  }
}
