import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  lat: number;
  lng: number;

  constructor() { }

  ngOnInit() {
    this.getUserLocation().then((position: any)=>{
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      console.log(position);
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
