import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {
  private token = ''

  public userLoggedIn: boolean = false

  constructor(private http: HttpClient, private router: Router) { }
    
    login(username, password): Promise<boolean> {
      this.token = '' 
      
      return this.http.post<any>('http://localhost:3000/login', {username, password}, {observe: 'response'})
        .toPromise()
        .then(res => {
          if (res.status == 200) {
            // console.info('logged in user info ---> ', res.body)
            this.userLoggedIn = true
            this.token = res.body.token
  
            let user = res.body.username
            localStorage.setItem(user, JSON.stringify(res.body))
            const userData = JSON.parse(localStorage.getItem(user))
            console.log('userData >>>> ', userData)
          }
          
          // console.info('token ---> ', this.token)
          return true
        })
        .catch(err => {
          if (err.status == 401) {
            // handle error, give to user
            console.info('err ---> ', err)
          }
          return false
        })
    }

    isLogin() {
      return this.token != ''
    }

    isUserLoggedIn() {
      console.log('this.userLoggedIn >>>> ', this.userLoggedIn)
      return this.userLoggedIn
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.isLogin())
        return true
      return this.router.parseUrl('/register') 
    }
}