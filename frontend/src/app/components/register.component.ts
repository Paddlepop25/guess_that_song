import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NgxSpinnerService } from "ngx-bootstrap-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @ViewChild('imageFile') imageFile: ElementRef;

  registerForm: FormGroup

  constructor(private fb: FormBuilder, private userSvc: UserService, private router: Router, private http: HttpClient, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      'image-file': this.fb.control('', [Validators.required])
    })
  }

  onSubmit() {
    this.spinner.show();
    
    const formData = new FormData();
    formData.append('upload', this.imageFile.nativeElement.files[0]);
    formData.append('username', this.registerForm.get('username').value)
    formData.append('email', this.registerForm.get('email').value)
    formData.append('password', this.registerForm.get('password').value)
    
    this.userSvc.registerUser(formData)
    console.log('USER IS REGISTERED')
    
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['/login'])
      this.registerForm.reset()
    }, 3000);
  }
}
