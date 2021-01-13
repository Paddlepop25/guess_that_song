import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { GuessThatSong } from '../guessthatsong.service';
import { Score } from '../score.model';

@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.css']
})

export class PopComponent implements OnInit {

  popform: FormGroup

  pop: [] = []

  pop_artists: [] = []

  info_michael_jackson: [] = []
  info_james_blunt: [] = []
  info_avril_lavigne: [] = []
  info_adele: [] = []
  info_billy_joel: [] = []
  info_bruno_mars: [] = []

  track_options_michael_jackson: [] = []
  track_options_james_blunt: [] = []
  track_options_avril_lavigne: [] = []
  track_options_adele: [] = []
  track_options_billy_joel: [] = []
  track_options_bruno_mars: [] = []

  title_michael_jackson: [] = []
  title_james_blunt: [] = []
  title_avril_lavigne: [] = []
  title_adele: [] = []
  title_billy_joel: [] = []
  title_bruno_mars: [] = []

  score: number = 0

  constructor(private fb: FormBuilder, private guessThatSongSvc: GuessThatSong, private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {

    this.popform = this.fb.group({
      answer_michael_jackson: this.fb.control('', [Validators.required]),
      answer_james_blunt: this.fb.control('', [Validators.required]),
      answer_avril_lavigne: this.fb.control('', [Validators.required]),
      answer_adele: this.fb.control('', [Validators.required]),
      answer_billy_joel: this.fb.control('', [Validators.required]),
      answer_bruno_mars: this.fb.control('', [Validators.required]),
    })

    this.guessThatSongSvc.getPop()
      .then(result => {
        this.pop = result

        for (let i=0; i<result.length; i++) {
          let obj = Object()
          const artist = result[i]['artist']
          obj.artist = artist
          // @ts-ignore
          this.pop_artists.push(obj)
          
          if (artist == 'Michael Jackson') {
            // @ts-ignore
            this.info_michael_jackson.push(result[i])
          }

          else if (artist == 'James Blunt') {
            // @ts-ignore
            this.info_james_blunt.push(result[i])
          }
          
          else if (artist == 'Avril Lavigne') {
            // @ts-ignore
            this.info_avril_lavigne.push(result[i])
          }
          
          else if (artist == 'Adele') {
            // @ts-ignore
            this.info_adele.push(result[i])
          }
          
          else if (artist == 'Billy Joel') {
            // @ts-ignore
            this.info_billy_joel.push(result[i])
          }
          
          else if (artist == 'Bruno Mars') {
            // @ts-ignore
            this.info_bruno_mars.push(result[i])
          }

          this.guessThatSongSvc.getPopArtist(this.pop_artists[i]['artist'])
          .then(result => {
            for (let j=0; j<result.length; j++) {
              const title = result[j]['title']
              const artist = result[j]['artist']

              if (artist == 'Michael Jackson') {
                // @ts-ignore
                this.track_options_michael_jackson.push(result[j])
                // @ts-ignore
                this.title_michael_jackson.push(title)
              }
              
              else if (artist == 'James Blunt') {
                // @ts-ignore
                this.track_options_james_blunt.push(result[j])
                // @ts-ignore
                this.title_james_blunt.push(title)
              }
              
              else if (artist == 'Avril Lavigne') {
                // @ts-ignore
                this.track_options_avril_lavigne.push(result[j])
                // @ts-ignore
                this.title_avril_lavigne.push(title)
              }
              
              else if (artist == 'Adele') {
                // @ts-ignore
                this.track_options_adele.push(result[j])
                // @ts-ignore
                this.title_adele.push(title)
              }
              
              else if (artist == 'Billy Joel') {
                // @ts-ignore
                this.track_options_billy_joel.push(result[j])
                // @ts-ignore
                this.title_billy_joel.push(title)
    
              }
              
              else if (artist == 'Bruno Mars') {
                // @ts-ignore
                this.track_options_bruno_mars.push(result[j])
                // @ts-ignore
                this.title_bruno_mars.push(title)
              }
            }
          })
        }
      })
  }

  onSubmit() {
    let user_answer_michael_jackson = this.popform.get('answer_michael_jackson').value
    let user_answer_james_blunt = this.popform.get('answer_james_blunt').value
    let user_answer_avril_lavigne = this.popform.get('answer_avril_lavigne').value
    let user_answer_adele = this.popform.get('answer_adele').value
    let user_answer_billy_joel = this.popform.get('answer_billy_joel').value
    let user_answer_bruno_mars = this.popform.get('answer_bruno_mars').value

    if (user_answer_michael_jackson == this.title_michael_jackson) {
      this.score++
    }
    if (user_answer_james_blunt == this.title_james_blunt) {
      this.score++
    }
    if (user_answer_avril_lavigne == this.title_avril_lavigne) {
      this.score++
    }
    if (user_answer_adele == this.title_adele) {
      this.score++
    }
    if (user_answer_billy_joel == this.title_billy_joel) {
      this.score++
    }
    if (user_answer_bruno_mars == this.title_bruno_mars) {
      this.score++
    }
    console.log('The SCORE is >>>> ', this.score)

    this.popform.reset()
    
    const currentUser = this.authSvc.loggedInUser()
    console.log(currentUser) // disappear after page refreshes
    const genre = 'pop'
    // @ts-ignore
    const user_id = currentUser[0]['userId']
    // @ts-ignore
    const username = currentUser[0]['username']
    const score = this.score
    
    this.guessThatSongSvc.insertScore({genre, user_id, username, score} as Score)

    // http://localhost:4200/score?genre=guitar_heroes&user_id=4&username=fred123&score=3
    this.router.navigate(['/score'], { queryParams: { genre: genre, user_id: user_id, username: username, score: score } });
  }
}

