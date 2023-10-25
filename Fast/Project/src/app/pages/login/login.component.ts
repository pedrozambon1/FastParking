import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotComponent } from '../dialog-forgot/forgot.component';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  dialog: any;
  primeiraEntrada: boolean = true;
  load: boolean = false;

  formLogin = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    check: [false],
  });

  ngOnInit(): void {}
  constructor(
    private storageService: StorageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

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

  onSubmit() {
    console.table(this.formLogin.value);
    this.load = true;
    if (this.formLogin.valid) {
      this.load = false;
      return;
    }
    if ((this.primeiraEntrada = true)) {
      this.router.navigate(['vagas']);
    }
  }
}
