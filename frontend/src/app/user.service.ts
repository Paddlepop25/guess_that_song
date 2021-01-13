import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user.model";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  async registerUser(formData): Promise<any> {
    const result = this.http.post('http://localhost:3000/register', formData)
      .toPromise()
      .catch((error:HttpErrorResponse) => {
        console.error('ERROR in registering user ---> ', error)
      })
    return result
  }
}