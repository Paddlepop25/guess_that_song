import { Component, OnInit } from '@angular/core';
// import { GuessThatSong } from '../guessthatsong.service';

// export interface SongDetails {
//   title: string;
//   class: string;
// }

@Component({
  selector: 'app-guessthatsong',
  templateUrl: './guessthatsong.component.html',
  styleUrls: ['./guessthatsong.component.css']
})

export class GuessthatsongComponent implements OnInit {

  // guitar_heroes: [] = []
  // guitarHeroesArray: SongDetails[] = [];

  // constructor(private guessThatSongSvc: GuessThatSong) { }

  ngOnInit(): void {
      
  //   this.guessThatSongSvc.getGuitarHeroes()
  //     .then(result => {
  //       this.guitar_heroes = result
  //       // console.log(result)
  //     })

  //   this.guessThatSongSvc.initGuitarHeroesSongs()
  //   this.guitarHeroesArray = this.guessThatSongSvc.retrieveGuitarHeroesSongs()     
  //   console.log(this.guitarHeroesArray) 
  
    }
}
