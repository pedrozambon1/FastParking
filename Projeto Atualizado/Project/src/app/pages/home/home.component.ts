import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // Guarda a referência do temporizador.
  // Assim conseguimos interromper o temporizador
  // a qualquer momento
  timerSubs!: Subscription;
  constructor(private router: Router) {}

  link() {
    this.router.navigate(['cadastro']);
  }
  // Array com a URL das imagens que serão exibidas
  // no carrossel
  @Input() imagens: string[] = [
    '../../../assets/img/img1.jpg',
    '../../../assets/img/img2.png',
    '../../../assets/img/img3.jpg',
    '../../../assets/img/img4.jpg',
  ];

  // Guarda a posição no array "imagens" que
  // corresponde a imagem que está sendo exibida
  // no carrossel
  private _indexImagemAtiva: number = 0;
  get indexImagemAtiva() {
    return this._indexImagemAtiva;
  }

  set indexImagemAtiva(value: number) {
    this._indexImagemAtiva = value < this.imagens.length ? value : 0;
  }

  ngOnInit(): void {
    this.iniciarTimer();
  }

  ngOnDestroy(): void {
    this.pararTimer();
  }

  iniciarTimer(): void {
    this.timerSubs = timer(4000).subscribe(() => {
      this.ativarImagem(this.indexImagemAtiva + 1);
    });
  }

  pararTimer(): void {
    this.timerSubs?.unsubscribe();
  }

  ativarImagem(index: number): void {
    this.indexImagemAtiva = index;
    this.iniciarTimer();
  }
  clearImage() {
    throw new Error('Method not implemented.');
  }
  openDialog(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
}
