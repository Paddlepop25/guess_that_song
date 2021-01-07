import { Component, OnInit } from '@angular/core';
import { GuessThatSong } from '../guessthatsong.service';

@Component({
  selector: 'app-guessthatsong',
  templateUrl: './guessthatsong.component.html',
  styleUrls: ['./guessthatsong.component.css']
})
export class GuessthatsongComponent implements OnInit {

  guitar_heroes: [] = []

  constructor(private guessThatSongSvc: GuessThatSong) { }

  ngOnInit(): void {

    this.guessThatSongSvc.getGuitarHeroes()
      .then(result => {
        this.guitar_heroes = result
        // console.log(result)
      })
  }
}
