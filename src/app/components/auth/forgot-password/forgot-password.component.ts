import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email = false;
  nomail = false;

  forgotEmail = '';

  token = null;

  password = '';
  confirmPassword = '';
  notMatching = false;


  changedPassword = false;
  updatedPassword = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.token = window.location.pathname.split('/')[2];
    console.log('***************' + this.token);
  }

  forgotPassword() {
    this.email = false;
    this.nomail = false;
    if (this.forgotEmail != '') {
      this.authService.forgotPassword(this.forgotEmail).subscribe((data) => {
        if (data === true) {
          this.email = true;
          this.nomail = false;
        } else {
          this.email = false;
          this.nomail = true;
        }
      });
    }
  }

  updatePassword() {
    this.notMatching = false;

    if (this.token != '' && this.password != '') {
      if (this.password === this.confirmPassword) {
        // console.log(this.token);
        // console.log(this.password);
        this.authService.updatePassword(this.token, this.password)
            .subscribe(data => {
              console.log(data);
              if (data.msg === 'success') {
                this.updatedPassword = true;
              }
            });
      } else {
        this.notMatching = true;
      }
    }
  }
}
