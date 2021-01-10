import { Component, OnInit } from '@angular/core';

declare const L: any

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // https://www.youtube.com/watch?v=orjkt0VHt1c 
    // important: turn on location services. browser will ask permission to know your location. click ok
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, long: ${position.coords.longitude}`
      );
      let mymap = L.map('map').setView(latLong, 14); // 13 is zoom level. 1 is whole map

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGFkZGxlcG9wIiwiYSI6ImNranFxdThodjAwNGUyeHBlZ3lsdXFkdG4ifQ.VhVegUtAn1HDKYAQSEYEtQ', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
  })
  .addTo(mymap);
  let marker = L.marker(latLong).addTo(mymap);

  marker.bindPopup("<b>Hello there!</b><br>❤️ Guess That Song 🥁 🎹 🎸 ").openPopup();
    }) 
  }
}