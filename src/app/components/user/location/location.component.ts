import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/user/location.service';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { User } from "src/app/models/user.model";



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

  // flags
  updatedSuccesfully: boolean;
  updateFailed: boolean;

  profileURL = environment.restAPIUrl + "/user/profile";


  constructor(private geo: LocationService, private http: HttpClient) { }

  ngOnInit() {
    // Get current address if it exists
    this.fetchProfile();

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

  private fetchProfile() {
    this.http.get<User>(this.profileURL).subscribe(
      (user: User) => {
        console.log(user);

        this.address = user.address;
      },
      error => {
        console.log(error);
      }
    );
  }


  updateLocation(){
    this.http.post<any>(environment.restAPIUrl + "/user/update-address", {address: this.address, lat : this.lat, lng : this.lng}).subscribe(data =>{
      if (data.message == "succesfully updated location"){
        this.updatedSuccesfully = true;
        this.updateFailed = false;
      }else{
        this.updateFailed = true;
        this.updatedSuccesfully = false;
      }
    })
  }
}
