import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  ngOnInit(): void {}
  constructor(private router: Router) {}
  return() {
    this.router.navigate(['config']);
  }
  return2() {
    this.router.navigate(['vagas']);
  }
  returHome() {
    this.router.navigate(['']);
  }
  returSensor() {
    this.router.navigate(['sensor']);
  }
}
