import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  public authTokenUserid: boolean;

  constructor(private authSvc: AuthService, private router: Router) {
    this.authSvc.userLoggedIn.subscribe((token) => {
      if (token != null) {
        this.authTokenUserid = true;
      } else {
        this.authTokenUserid = false;
      } 
    })
  }

  ngOnInit(): void {
    // console.log('ngInit');
    if (this.authSvc.isUserLoggedIn()) {
      this.authTokenUserid = true
    } else {
      this.authTokenUserid = false
    }
    // console.log(this.authTokenUserid) // true after hit page refresh
    // console.log(this.authSvc.isUserLoggedIn()) // true after hit page refresh
  }

  onLogout() {
    this.authSvc.logout()
    this.router.navigate(['/login'])
  }
}