import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private router: Router, private _formBuilder: FormBuilder) {}
  isLinear = false;
  return() {
    this.router.navigate(['login']);
  }
  firstFormGroup = this._formBuilder.group({
    email: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    codigo: ['', Validators.required],
  });
  terceiroFormGroup = this._formBuilder.group({
    senha: ['', Validators.required],
    confirmacao: ['', Validators.required],
  });
}
