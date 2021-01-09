import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface SongDetails {
  title: string;
  class: string;
}

@Injectable()
 export class GuessThatSong {

  guitarHeroesArray: SongDetails[] = [];

  constructor(private http: HttpClient) {}

  initGuitarHeroesSongs(): void {
    const initialSongList = [
        { title: "Wrong Answer A", class: "btn btn-warning mb-2" },
        { title: "This is the right answer", class: "btn btn-info mb-2" },
        { title: "Wrong Answer B", class: "btn btn-dark mb-2" }
    ];

    while(initialSongList.length > 0) {
        const randomNum = this.randomize(initialSongList.length);
        this.guitarHeroesArray.push(initialSongList[randomNum]);
        initialSongList.splice(randomNum, 1);
    }
  }

  retrieveGuitarHeroesSongs(): SongDetails[] {
    return this.guitarHeroesArray;
  }

  randomize(seed: number): number {
    return Math.floor(Math.random() * seed);
  }

  async getGuitarHeroes(): Promise<any> {
    const result = await this.http.get<any>('http://localhost:3000/guitar_heroes')
    .toPromise()
    .catch((error: HttpErrorResponse) => {
      console.log('HttpError ---> ', error)
    })
  // console.log('getGuitarHeroes >>> ', result[0]['title'])
  return result
  }
 }
