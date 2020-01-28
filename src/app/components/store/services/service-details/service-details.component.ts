import { Component, OnInit, Input } from '@angular/core';
import { Service } from 'src/app/models/service';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';
import { Technician } from 'src/app/models/technician';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  @Input() technicians: Technician[];
 
  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
  ) { }

  ngOnInit() {
    this.getService();
  }

  getService(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.serviceService.getService(id).subscribe(technicians => (this.technicians = technicians));
    
  }
  
}
