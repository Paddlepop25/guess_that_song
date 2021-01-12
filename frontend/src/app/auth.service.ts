import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {
  private token = ''

  public userLoggedIn: boolean = false

  currentUser: [] = []

  constructor(private http: HttpClient, private router: Router) { }
    
    login(username, password): Promise<boolean> {
      this.token = '' 
      
      return this.http.post<any>('http://localhost:3000/login', {username, password}, {observe: 'response'})
        .toPromise()
        .then(res => {
          if (res.status == 200) {
            // console.info('logged in user info ---> ', res.body)

            let obj = {}

            this.userLoggedIn = true
            this.token = res.body.token
  
            let user = res.body.username
            let userId = res.body.userId

            // @ts-ignore
            obj.username = user
            // @ts-ignore
            obj.userId = userId

            localStorage.setItem(user, JSON.stringify(res.body))
            const userData = JSON.parse(localStorage.getItem(user))
            // console.log('userData >>>> ', userData)
            
            // @ts-ignore
            this.currentUser.push(obj)
            // console.log(this.currentUser) // ok
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

    loggedInUser() {
      return this.currentUser
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
      return this.router.parseUrl('/login') 
    }
}