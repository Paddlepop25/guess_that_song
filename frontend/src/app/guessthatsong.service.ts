import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
 export class GuessThatSong {

  constructor(private http: HttpClient) {}

  async getGuitarHeroes(): Promise<any> {
    const result = await this.http.get<any>('http://localhost:3000/guitar_heroes')
    .toPromise()
    .catch((error: HttpErrorResponse) => {
      console.log('HttpError ---> ', error)
    })
  // console.log('getGuitarHeroes >>> ', result)
  return result
  }
 }
