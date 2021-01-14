import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Subject } from 'rxjs';
//import { runInThisContext } from "vm";

@Injectable()
export class AuthService implements CanActivate {
  private token = ''

  public userLoggedIn = new Subject();

  currentUser = {};

  constructor(private http: HttpClient, private router: Router) { }
    
    async login(username, password): Promise<boolean> {
      this.token = '' 
      
      return await this.http.post<any>('http://localhost:3000/login', {username, password}, {observe: 'response'})
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
            this.currentUser = obj;
            localStorage.setItem('currentUser', JSON.stringify(obj));
            // console.log(this.currentUser) // ok
            // console.log(this.userLoggedIn) // ok
            if(this.token != null){
              console.log('token is not null');
              return true;
            }
          }
                    
          //return true
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
      console.log('auth svc>', this.currentUser);
      console.log(this.currentUser);
      if(Object.entries(this.currentUser).length === 0){
        let currentLocalStorage = localStorage.getItem('currentUser');
        this.currentUser = JSON.parse(currentLocalStorage);
      }
      return this.currentUser 
    }

    isUserLoggedIn() {
      let authToken = localStorage.getItem('auth_token')
      return (authToken != null ? true: false)
    }

    logout() {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('currentUser')
      this.userLoggedIn.next(null);
      this.userLoggedIn.complete();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log('isUserLoggedIn() >>>> ', this.isUserLoggedIn())
      if (this.isUserLoggedIn())
        return true
        
      return this.router.parseUrl('/login') 
    }
}