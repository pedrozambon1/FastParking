import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotComponent } from '../dialog-forgot/forgot.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  dialog: any;
  ngOnInit(): void {}
  constructor(private router: Router, private _formBuilder: FormBuilder) {}

  return() {
    this.router.navigate(['']);
  }
  return3() {
    this.router.navigate(['cadastro']);
  }
  openForget() {
    this.router.navigate(['forgot']);
  }

  change() {
    this.router.navigate(['vagas']);
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
}
