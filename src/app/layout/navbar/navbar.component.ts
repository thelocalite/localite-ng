import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';

import * as M from '../../../assets/js/materialize.min';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    // Sidenav Init
    const sidenav = document.querySelector('.sidenav');
    M.Sidenav.init(sidenav, {});


    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var instances = M.Dropdown.init('#profileListDrop', {});
    });
  }
}
