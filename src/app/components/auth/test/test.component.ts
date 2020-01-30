import { Component, OnInit } from '@angular/core';
import { AuthTestService } from 'src/app/services/auth/auth-test.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  test: string;

  constructor(private authTestService: AuthTestService) { }

  ngOnInit() {
  }

  callTest(){
    this.authTestService.testAuth().subscribe(data => {
      console.log(data);

      this.test = data.message;
      console.log(this.test);

    });
  }

}
