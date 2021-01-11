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
            this.token = res.body.token
  
            // var siteName = 'My site'
            // localStorage.setItem('siteName', siteName)
            // const localData = localStorage.getItem('siteName')
            // console.log(localData)
  
            let user = res.body.username
            localStorage.setItem(user, JSON.stringify(res.body))
            const userData = JSON.parse(localStorage.getItem(user))
            console.log('userData >>>> ', userData)

          }
          // console.info('logged in user info ---> ', res.body)
          /*
          {userId: 2, 
          username: "wilma", 
          message: "Login at Mon Jan 11 2021 19:15:07 GMT+0800 (Singapore Standard Time)", 
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ3a…pIn19.1NsXndZacM1oJRwZZX7cOYpyidfQePaoh7sMA62tXw4"}
            */
          
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
      this.userLoggedIn = true
      return this.token != ''
    }

    isUserLoggedIn() {
      // console.log('this.userLoggedIn >>>> ', this.userLoggedIn)
      return this.userLoggedIn
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (this.isLogin())
        return true
      return this.router.parseUrl('/register') 
    }
}