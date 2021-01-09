import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user.model";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  async registerUser(user: User): Promise<any> {
    // console.log(user) // object
    const result = this.http.post('http://localhost:3000/register', user)
      .toPromise()
      .catch((error:HttpErrorResponse) => {
        console.error('ERROR in registering user ---> ', error)
      })
    return result
  }

  async userLogin(username: string, password: string): Promise<any> {
    console.log(username, password)
  }
}