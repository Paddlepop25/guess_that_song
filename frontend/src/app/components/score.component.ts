import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  genre: string = ''
  user_id: string = ''
  username: string = ''
  score: string = ''
  percentage: string = ''

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // http://localhost:4200/score?genre=guitar_heroes&user_id=4&username=fred123&score=3
    const route = this.activatedRoute.snapshot.queryParamMap
    const genre = route.get('genre');
    const user_id = route.get('user_id');
    const username = route.get('username');
    const score = route.get('score');

    this.genre = genre
    this.user_id = user_id
    this.username = username
    this.score = score

    const percentage = ((parseInt(score)/6) * 100).toFixed(2)
    this.percentage = percentage
  }
}
