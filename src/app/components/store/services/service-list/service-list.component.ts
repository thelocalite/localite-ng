import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  services: Service[];
  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.getServices();
  }

  getServices(): void {
    
    this.serviceService.getServices().subscribe(services => (this.services = services));
    
  }
}
