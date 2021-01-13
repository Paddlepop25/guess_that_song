import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MapService {

  constructor(private http: HttpClient) {}

  private map = ''
  map_accessToken = ''

  getMapToken(): Promise<any> { 
    return this.http.get<any>('http://localhost:3000')
    .toPromise()
    .then(token =>
      this.map_accessToken = token
      )}

  displayMap() {
    // important: turn on location services. browser will ask permission to know your location. click ok
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, long: ${position.coords.longitude}`
      );
      // @ts-ignore
      let mymap = L.map('map').setView(latLong, 14); // 13 is zoom level. 1 is whole map

      // @ts-ignore
      L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${this.map_accessToken}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
  })
  .addTo(mymap);
  // @ts-ignore
  let marker = L.marker(latLong).addTo(mymap);

  marker.bindPopup("<b>Hello there!</b><br>❤️ Guess That Song 🥁 🎹 🎸 ").openPopup();
    }) 
  }
}