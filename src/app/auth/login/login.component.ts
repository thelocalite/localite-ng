import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import * as M from '../../../assets/js/materialize.min';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.login();

    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
    });
  }
}
