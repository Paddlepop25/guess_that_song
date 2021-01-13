import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Subject } from 'rxjs';

@Injectable()
export class AuthService implements CanActivate {
  private token = ''

  public userLoggedIn = new Subject();

  currentUser: [] = []

  constructor(private http: HttpClient, private router: Router) { }
    
    login(username, password): Promise<boolean> {
      this.token = '' 
      
      return this.http.post<any>('http://localhost:3000/login', {username, password}, {observe: 'response'})
        .toPromise()
        .then(res => {
          if (res.status == 200) {
            console.info('logged in user info ---> ', res.body)
            // localStorage.setItem('map_token', this.token);

            let obj = {}

            this.token = res.body.token
  
            let user = res.body.username
            console.log('logged in user >>>> ', user)
            let userId = res.body.userId
            console.log('logged in userId >>>> ', userId)

            // @ts-ignore
            obj.username = user
            // @ts-ignore
            obj.userId = userId

            localStorage.setItem('auth_token', this.token);
            this.userLoggedIn.next(this.token);
            // const userData = JSON.parse(localStorage.getItem(user))
            
            // @ts-ignore
            this.currentUser.push(obj)
            // console.log(this.currentUser) // ok
            // console.log(this.userLoggedIn) // ok
          }
                    
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
    
    // GONE when page refreshed. very important to have for the submit score button!!
    loggedInUser() {
      return this.currentUser 
    }

    isUserLoggedIn() {
      let authToken = localStorage.getItem('auth_token')
      return (authToken != null ? true: false)
    }

    logout() {
      localStorage.removeItem('auth_token')
      this.userLoggedIn.next();
      this.userLoggedIn.complete();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log('isUserLoggedIn() >>>> ', this.isUserLoggedIn())
      if (this.isUserLoggedIn())
        return true
        
      return this.router.parseUrl('/login') 
    }
}