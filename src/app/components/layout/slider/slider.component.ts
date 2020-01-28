import {Component, OnInit} from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
 
  services: Service[];
  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.getServices();
  }

  getServices(): void {
    
    this.serviceService.getServices().subscribe(services => (this.services = services));
    
  }
}
