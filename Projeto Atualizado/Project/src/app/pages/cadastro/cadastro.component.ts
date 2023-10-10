import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  // Sempre que a página iniciar os dados serão enviados (só para teste)
  ngOnInit(): void {
    this.cadastrar();
  }

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
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  return() {
    this.router.navigate(['login']);
  }
  // return() {
  //  this.router.navigate(['login']);
  //}

  cadastrar() {
    // Cria um obj com os dados a serem enviados
    const dados = {
      cli_nome: this.cli_nome,
      cli_email: this.cli_email,
      cli_telefone: this.cli_telefone,
      cli_endereco: this.cli_endereco,
      cli_data_nasc: this.cli_data_nasc,
      cli_sexo: this.cli_sexo,
      cli_cpf: this.cli_cpf,
      cli_status: this.cli_status,

      emp_cnpj: this.emp_cnpj,
      emp_situacao_cadastral: this.emp_situacao_cadastral,
      emp_data_abertura: this.emp_data_abertura,
      emp_nome_empresarial: this.emp_nome_empresarial,
      emp_atividades_econômicas: this.emp_atividades_econômicas,
      emp_natureza_juridica: this.emp_natureza_juridica,
      emp_endereço_contato: this.emp_endereço_contato,
      emp_capital: this.emp_capital,
      emp_status: this.emp_status,

      est_qnt_vagas: this.est_qnt_vagas,
      est_endereco: this.est_endereco,
      est_status: this.est_status,
    };

    // Adiciona um console.log para verificar se o método está sendo mesmo chamado
    console.log('Método cadastrar() chamado');

    // URL em que os dados serão enviados
    const url = 'http://localhost:3000/enviar-dados';

    // Faz uma requisição HTTP POST para enviar os dados para o servidor. Depois eu altero o subscribe ;)
    this.http.post(url, dados).subscribe(
      (response) => {
        // Trata a resposta do servidor se necessário
        console.log('Resposta do servidor:', response);
      },
      (error) => {
        // Trate os erros da solicitação se ocorrerer
        console.error('Erro na solicitação:', error);
      }
    );
  }
}
