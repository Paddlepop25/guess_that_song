import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Score } from "./score.model";
import { environment } from '../environments/environment';

@Injectable()
 export class GuessThatSong {

  constructor(private http: HttpClient) {}

  async getGuitarHeroes(): Promise<any> {
    const result = await this.http.get<any>(`${environment.api_url}/guessthatsong/guitar_heroes`)
    .toPromise()
    .catch((error: HttpErrorResponse) => {
      console.log('HttpError ---> ', error)
    })
  return result
  }

  async getGuitarHeroesArtist(artist): Promise<any> {
    const result = await this.http.get<any>(`${environment.api_url}/guessthatsong/guitar_heroes/${artist}`)
    .toPromise()
    .catch((error: HttpErrorResponse) => {
      console.log('HttpError ---> ', error)
    })
  return result
  }

  async getPop(): Promise<any> {
    const result = await this.http.get<any>(`${environment.api_url}/guessthatsong/pop`)
    .toPromise()
    .catch((error: HttpErrorResponse) => {
      console.log('HttpError ---> ', error)
    })
  return result
  }

  async getPopArtist(artist): Promise<any> {
    const result = await this.http.get<any>(`${environment.api_url}/guessthatsong/pop/${artist}`)
    .toPromise()
    .catch((error: HttpErrorResponse) => {
      console.log('HttpError ---> ', error)
    })
  return result
  }

  async insertScore(score: Score): Promise<any> {
    // console.log('SCORE >>>> ', score['score'])
    // console.log('GENRE >>>> ', score.genre)
    // console.log('USERID >>>> ', score['user_id'])

    const result = await this.http.post(`${environment.api_url}/score`, score)
    .toPromise()
    .catch((error: HttpErrorResponse) => {
      console.error('ERROR in inserting score', error)
    })
    return result
  }
 }
