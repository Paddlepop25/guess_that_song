import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  async registerUser(formData): Promise<any> {
    const result = this.http.post(`${environment.api_url}/register`, formData)
      .toPromise()
      .then(result => {
        // console.log(result) // display message from registerUsers res.json
      })
      .catch((error:HttpErrorResponse) => {
        console.error('ERROR in registering user ---> ', error)
      })
    return result
  }
}