import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  gameform: FormGroup


  guitar_heroes: [] = []
  // guitarHeroesArray: SongDetails[] = [];
  guitar_heroes_artists: [] = []

  info_john_mayer: [] = []
  info_eric_clapton: [] = []
  info_coldplay: [] = []
  info_eagles: [] = []
  info_jimi_hendrix: [] = []
  info_tommy_emmanuel: [] = []

  track_options_john_mayer: [] = []
  track_options_eric_clapton: [] = []
  track_options_coldplay: [] = []
  track_options_eagles: [] = []
  track_options_jimi_hendrix: [] = []
  track_options_tommy_emmanuel: [] = []

  title_john_mayer: [] = []
  title_eric_clapton: [] = []
  title_coldplay: [] = []
  title_eagles: [] = []
  title_jimi_hendrix: [] = []
  title_tommy_emmanuel: [] = []

  track_options_test = ["a", "b", "c"]

  score: number = 0

  constructor(private fb: FormBuilder, private guessThatSongSvc: GuessThatSong) { }
  
  ngOnInit(): void {
    // console.log(this.info_tommy_emmanuel)
    // console.log(this.track_options_tommy_emmanuel)

    this.gameform = this.fb.group({
      answer_john_mayer: this.fb.control('', [Validators.required]),
      answer_eric_clapton: this.fb.control('', [Validators.required]),
      answer_coldplay: this.fb.control('', [Validators.required]),
      answer_eagles: this.fb.control('', [Validators.required]),
      answer_jimi_hendrix: this.fb.control('', [Validators.required]),
      answer_tommy_emmanuel: this.fb.control('', [Validators.required]),
    })
      
    this.guessThatSongSvc.getGuitarHeroes()
      .then(result => {
        // console.log(result[0]['artist'])
        this.guitar_heroes = result
        // console.log(this.guitar_heroes) // can get all 6 [{…}, {…}, {…}, {…}, {…}, {…}]

        // console.log(result[0])
        // @ts-ignore
        // console.log(this.info_john_mayer)
        
        for (let i=0; i<result.length; i++) {
          let obj = Object()
          // console.log(result[i]['artist']) // can get all artists
          // this.info_john_mayer.push(result[0])
          const artist = result[i]['artist']
          obj.artist = artist
          // console.log(obj)
          // @ts-ignore
          this.guitar_heroes_artists.push(obj)
          
          if (artist == 'John Mayer') {
            // @ts-ignore
            this.info_john_mayer.push(result[i])
          }

          else if (artist == 'Eric Clapton') {
            // @ts-ignore
            this.info_eric_clapton.push(result[i])
          }
          
          else if (artist == 'Coldplay') {
            // @ts-ignore
            this.info_coldplay.push(result[i])
          }
          
          else if (artist == 'Eagles') {
            // @ts-ignore
            this.info_eagles.push(result[i])
          }
          
          else if (artist == 'Jimi Hendrix') {
            // @ts-ignore
            this.info_jimi_hendrix.push(result[i])
          }
          
          else if (artist == 'Tommy Emmanuel') {
            // @ts-ignore
            this.info_tommy_emmanuel.push(result[i])
          }

          // console.log(this.guitar_heroes_artists[i]['artist']) // all artists, individually
          this.guessThatSongSvc.getGuitarHeroesArtist(this.guitar_heroes_artists[i]['artist'])
          .then(result => {
            // console.log(result)
            // console.log(result[0]['artist'])
            
            for (let j=0; j<result.length; j++) {
              const title = result[j]['title']
              const artist = result[j]['artist']

              if (artist == 'John Mayer') {
                // @ts-ignore
                this.track_options_john_mayer.push(result[j])
                // @ts-ignore
                this.title_john_mayer.push(title)
                // console.log(this.title_john_mayer)
              }
              
              else if (artist == 'Eric Clapton') {
                // @ts-ignore
                this.track_options_eric_clapton.push(result[j])
                // @ts-ignore
                this.title_eric_clapton.push(title)
              }
              
              else if (artist == 'Coldplay') {
                // @ts-ignore
                this.track_options_coldplay.push(result[j])
                // @ts-ignore
                this.title_coldplay.push(title)
              }
              
              else if (artist == 'Eagles') {
                // @ts-ignore
                this.track_options_eagles.push(result[j])
                // @ts-ignore
                this.title_eagles.push(title)
              }
              
              else if (artist == 'Jimi Hendrix') {
                // @ts-ignore
                this.track_options_jimi_hendrix.push(result[j])
                // @ts-ignore
                this.title_jimi_hendrix.push(title)
    
              }
              
              else if (artist == 'Tommy Emmanuel') {
                // @ts-ignore
                this.track_options_tommy_emmanuel.push(result[j])
                // @ts-ignore
                this.title_tommy_emmanuel.push(title)
              }
            }
          })
        }

        // console.log(this.guitar_heroes_artists) // array of 6 objects [{}, {}...] 0: {artist: "John Mayer"}
        // console.log('track_options_john_mayer >>>> ', this.track_options_john_mayer)
        // console.log('track_options_eric_clapton >>>> ', this.track_options_eric_clapton)
        // console.log('track_options_coldplay >>>> ', this.track_options_coldplay)
        // console.log('track_options_eagles >>>> ', this.track_options_eagles)
        // console.log('track_options_jimi_hendrix >>>> ', this.track_options_jimi_hendrix)
        // console.log('track_options_tommy_emmanuel >>>> ', this.track_options_tommy_emmanuel)
      })
      // console.log(this.guitarHeroesArray) 
      }

    onSubmit() {
      let user_answer_john_mayer = this.gameform.get('answer_john_mayer').value
      let user_answer_eric_clapton = this.gameform.get('answer_eric_clapton').value
      let user_answer_coldplay = this.gameform.get('answer_coldplay').value
      let user_answer_eagles = this.gameform.get('answer_eagles').value
      let user_answer_jimi_hendrix = this.gameform.get('answer_jimi_hendrix').value
      let user_answer_tommy_emmanuel = this.gameform.get('answer_tommy_emmanuel').value

      // console.log(user_answer_jimi_hendrix, user_answer_john_mayer)

      if (user_answer_john_mayer == this.title_john_mayer) {
        this.score++
      }
      if (user_answer_eric_clapton == this.title_eric_clapton) {
        this.score++
      }
      if (user_answer_coldplay == this.title_coldplay) {
        this.score++
      }
      if (user_answer_eagles == this.title_eagles) {
        this.score++
      }
      if (user_answer_jimi_hendrix == this.title_jimi_hendrix) {
        this.score++
      }
      if (user_answer_tommy_emmanuel == this.title_tommy_emmanuel) {
        this.score++
      }
      console.log('SCORE is >>>> ', this.score)
    }
  }

    // this.guessThatSongSvc.initGuitarHeroesSongs()
    // this.guitarHeroesArray = this.guessThatSongSvc.retrieveGuitarHeroesSongs()     
