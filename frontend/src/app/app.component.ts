import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  private authTokenUserid = new BehaviorSubject<boolean>(false);

  constructor(private authSvc: AuthService, private router: Router) {
    this.authSvc.userLoggedIn.subscribe((token) => {
      console.log(">>>", token);
      if (token != null) {
        this.authTokenUserid.next(true);
      } else {
        this.authTokenUserid.next(false);
      } 
    })
  }

  ngOnInit() {
    // console.log('ngInit');
    if (this.authSvc.isUserLoggedIn()) {
      this.authTokenUserid.next(true);
    } else {
      this.authTokenUserid.next(false);
    }
    // console.log(this.authTokenUserid) // true after hit page refresh
    // console.log(this.authSvc.isUserLoggedIn()) // true after hit page refresh
  }

  onLogout() {
    this.authSvc.logout()
    this.router.routeReuseStrategy.shouldReuseRoute= ()=> false;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this.router.navigate(['login']));
    //this.router.navigate(['login'])
  }
}