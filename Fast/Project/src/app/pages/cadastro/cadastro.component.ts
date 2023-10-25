import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  // Variáveis que serão enviadas para o MySQL
  cli_nome: string = 'Natan';
  cli_email: string = 'Email2';
  cli_telefone: string = '8593843432';
  cli_endereco: string = 'fadfsda';
  cli_data_nasc: string = '1999-09-01';
  cli_sexo: string = 'M';
  cli_cpf: string = '4324213';
  cli_status: number = 1;

  emp_cnpj: string = 'fdsafdsaf';
  emp_situacao_cadastral: string = 'ativa';
  emp_data_abertura: string = '1999-09-01';
  emp_nome_empresarial: string = 'adsadas';
  emp_atividades_econômicas: string = 'dsadas';
  emp_natureza_juridica: string = 'sdads';
  emp_endereço_contato: string = 'dsadas';
  emp_capital: string = 'dasda';
  emp_status: number = 1;

  est_qnt_vagas: number = 30;
  est_endereco: string = 'gfdsfgdsfgds';
  est_status: number = 1;

  //constructor(private router: Router) {}
  formCadastro = this._formBuilder.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required],
    cpf: ['', Validators.required],
    nome_empresa: ['', Validators.required],
    cep: ['', Validators.required],
    endereco: ['', Validators.required],
    bairro: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: ['', Validators.required],
  });

  isLinear = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService
  ) {}

  voltinha() {
    this.router.navigate(['login']);
  }

  cadastrar(stepper: any) {
    console.table(this.formCadastro.value);
    if (this.formCadastro.invalid) return;

    console.log('Método cadastrar() chamado');

    this.http
      .post('enviar-dados', {
        dados: {
          cli_nome: this.formCadastro.value.nome,
          cli_sobrenome: this.formCadastro.value.sobrenome,
          cli_cpf: this.formCadastro.value.cpf,
          emp_nome_empresarial: this.formCadastro.value.nome_empresa,
          cli_endereco: this.formCadastro.value.endereco,
          cli_bairro: this.formCadastro.value.bairro,
          cli_numero: this.formCadastro.value.numero,
          cli_complemento: this.formCadastro.value.complemento,
        },
      })
      .subscribe(
        (res) => {
          console.log('Resposta do servidor:', res);
          stepper.next();
        },
        (error) => {
          // Trate os erros da solicitação se ocorrerer
          console.error('Erro na solicitação:', error);
        }
      );
  }
}
