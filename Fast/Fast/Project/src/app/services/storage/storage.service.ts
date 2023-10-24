import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  user = new BehaviorSubject<any>(null);
  token = new BehaviorSubject<string | null>(null);
  routerPath = new BehaviorSubject<string | null>(null);
  search = new BehaviorSubject<any>(null);
  content = new BehaviorSubject<any>(null);
  code = new BehaviorSubject<any>(null);

  enterprise = new BehaviorSubject<any>(null);

  userImage = new BehaviorSubject<any>(null);

  constructor(private router: Router) {
    this.token.next(localStorage.getItem('token'));
    this.token.subscribe((value) =>
      value
        ? localStorage.setItem('token', value)
        : localStorage.removeItem('token')
    );

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => e as NavigationEnd)
      )
      .subscribe((e) => this.routerPath.next(e.urlAfterRedirects));
  }
}
