import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  vars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  constructor() {}

  ngOnInit() {}
}
