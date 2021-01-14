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

  constructor(private authSvc: AuthService, private router: Router) {
    this.authSvc.purgeAuth();
 }

  ngOnInit() { }

  onLogout() {
    this.authSvc.logout()
    this.router.routeReuseStrategy.shouldReuseRoute= ()=> false;
    this.router.navigate(['/'])
  }
}