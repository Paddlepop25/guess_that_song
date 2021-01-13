import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private mapSvc: MapService) { }

  ngOnInit(): void {

    this.mapSvc.displayMap()
    this.mapSvc.getMapToken()
    
  }
}