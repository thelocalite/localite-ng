import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  lat: number;
  lng: number;

  address : string;

  markers = [];

  constructor(private geo: LocationService) { }

  ngOnInit() {
    this.getUserLocation().then((position: any)=>{
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      console.log(position);

      for (let i = 0; i < 10; i++){
        this.markers.push({lat: position.coords.latitude + (Math.floor((Math.random() * 1000000)+1)/1000000),
          lng: position.coords.longitude + (Math.floor((Math.random() * 1000000)+1)/1000000)})
      }

    }).catch((err)=>{
      console.log(err);
    });

  }

  private getUserLocation() {
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
  }

}
