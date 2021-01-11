import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  loggedIn: Boolean = false

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {

    // @ts-ignore
    // console.log(this.authSvc.isUserLoggedIn()) // always false
  }
}
