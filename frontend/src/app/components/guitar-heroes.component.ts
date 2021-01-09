import { Component, OnInit } from '@angular/core';
import { GuessThatSong } from '../guessthatsong.service';

export interface SongDetails {
  title: string;
  class: string;
}

@Component({
  selector: 'app-guitar-heroes',
  templateUrl: './guitar-heroes.component.html',
  styleUrls: ['./guitar-heroes.component.css']
})

export class GuitarHeroesComponent implements OnInit {

  guitar_heroes: [] = []
  guitarHeroesArray: SongDetails[] = [];

  constructor(private guessThatSongSvc: GuessThatSong) { }

  ngOnInit(): void {
      
    this.guessThatSongSvc.getGuitarHeroes()
      .then(result => {
        this.guitar_heroes = result
        // console.log(result)
      })

    this.guessThatSongSvc.initGuitarHeroesSongs()
    this.guitarHeroesArray = this.guessThatSongSvc.retrieveGuitarHeroesSongs()     
    console.log(this.guitarHeroesArray) 
    }

}
