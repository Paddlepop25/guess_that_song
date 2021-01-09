import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user.model";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  async registerUser(user: User): Promise<any> {
    console.log(user)
  }
}

// export interface User {
//   user_id?: string;
//   username: string;
//   password: string;
//   email: string;
//   image_key?: string;
//   score?: number;
//   timestamp?: string;
// }