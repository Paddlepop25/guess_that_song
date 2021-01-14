import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  public isLoggedInToken: Observable<boolean> = this.authTokenUserid.asObservable();
  showAuth: boolean;

  constructor(private authSvc: AuthService, private router: Router) {
    this.authSvc.userLoggedIn.subscribe((token) => {
      console.log(">>>", token);
      if (token != null) {
        this.authTokenUserid.next(true);
        this.isLoggedInToken.subscribe((data)=>{
          this.showAuth = data;
        });
      } else {
        this.authTokenUserid.next(false);
        this.isLoggedInToken.subscribe((data)=>{
          this.showAuth = data;
        });
      } 
    })
  }

  ngOnInit() {
    // console.log('ngInit');
    if (this.authSvc.isUserLoggedIn()) {
      this.authTokenUserid.next(true);
      this.isLoggedInToken.subscribe((data)=>{
        this.showAuth = data;
      });
    } else {
      this.authTokenUserid.next(false);
      this.isLoggedInToken.subscribe((data)=>{
        this.showAuth = data;
      });
    }
  }

  onLogout() {
    this.authSvc.logout()
    this.router.routeReuseStrategy.shouldReuseRoute= ()=> false;
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this.router.navigate(['/']));
    this.router.navigate(['/'])
  }
}