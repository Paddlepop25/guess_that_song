import { Component, OnInit } from '@angular/core';
import { GuessThatSong } from '../guessthatsong.service';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.css']
})
export class PopComponent implements OnInit {

  pop: [] = []

  constructor(private guessThatSongSvc: GuessThatSong) { }

  ngOnInit(): void {

    this.guessThatSongSvc.getPop()
      .then(result => {
        // console.log(result)
        this.pop = result
      })
  }
}

// {
//   artist: 'Michael Jackson',
//   title: 'Billie Jean',
//   preview: 'https://p.scdn.co/mp3-preview/f504e6b8e037771318656394f532dede4f9bcaea?cid=f7b4d44f9119479aabe5847141835e89',
//   image: 'https://i.scdn.co/image/ab67616d00001e024121faee8df82c526cbab2be',
//   uri: 'spotify:track:5ChkMS8OtdzJeqyybCc9R5'
// },