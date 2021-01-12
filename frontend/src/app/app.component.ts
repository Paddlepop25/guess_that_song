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

  //loggedIn: Boolean = false
  public authTokenUserid: boolean;

  constructor(private authSvc: AuthService, private router: Router) {
    this.authSvc.userLoggedIn.subscribe((token) => {
      if(token != null) {
        this.authTokenUserid = true;
      }else{
        this.authTokenUserid = false;
      } 
    });
  }

  ngOnInit(): void {
    console.log('ngInit');
    //this.authSvc.userLoggedIn.subscribe(token=> this.authTokenUserid = token);
    if(this.authSvc.isUserLoggedIn()) {
      this.authTokenUserid = true;
    }else{
      this.authTokenUserid = false;
    }
    console.log(this.authTokenUserid)
    console.log(this.authSvc.isUserLoggedIn()) // false

    // event emitter , subscribe to subject
  }

  onLogout() {
    this.authSvc.logout()
    this.router.navigate(['/login'])
  }
}















/**
 * game.service
 * 
 * event = new Subject<>
 * 
 * this.event.next()
 * day35
 * 
 * listen to this
 */