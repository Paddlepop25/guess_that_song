import { Component, OnInit } from '@angular/core';
import { GuessThatSong } from '../guessthatsong.service';

// export interface SongDetails {
//   title: string;
//   class: string;
// }

@Component({
  selector: 'app-guitar-heroes',
  templateUrl: './guitar-heroes.component.html',
  styleUrls: ['./guitar-heroes.component.css']
})

export class GuitarHeroesComponent implements OnInit {

  guitar_heroes: [] = []
  // guitarHeroesArray: SongDetails[] = [];
  guitar_heroes_artists: [] = []
  
  constructor(private guessThatSongSvc: GuessThatSong) { }
  
  ngOnInit(): void {
      
    this.guessThatSongSvc.getGuitarHeroes()
      .then(result => {
        // console.log(result[0]['artist'])
        this.guitar_heroes = result
        
        for (let i=0; i<result.length; i++) {
          let obj = Object()
          // console.log(result[i]['artist']) // can get all artists
          obj.artist = result[i]['artist']
          // console.log(obj)
          // @ts-ignore
          this.guitar_heroes_artists.push(obj)

          // console.log(this.guitar_heroes_artists[i]['artist']) // all artists, individually
          this.guessThatSongSvc.getGuitarHeroesArtist(this.guitar_heroes_artists[i]['artist'])
          .then(result => {
            console.log(result)
            // this.guitar_heroes = result
          })
        }
        // console.log(this.guitar_heroes_artists) // array of 6 objects [{}, {}...] 0: {artist: "John Mayer"}
      })
    

    //   // artist: "John Mayer"
    //   // id: 1
    //   // title: "Slow Dancing in a Burning Room"
    //   // track_option1: "Gravity"
    //   // track_option2: "Daughters"
    //   // track_option3: "Slow Dancing in a Burning Room"
    //   // uri: "spotify:track:2jdAk8ATWIL3dwT47XpRfu"
    // })

    // this.guessThatSongSvc.initGuitarHeroesSongs()
    // this.guitarHeroesArray = this.guessThatSongSvc.retrieveGuitarHeroesSongs()     
    // console.log(this.guitarHeroesArray) 
    }
}
