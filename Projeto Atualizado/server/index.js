const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const connection = require('./api/config/config-database.js');

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.get('/obter-dado/:id', (req, res) => {
  const id = req.params.id;

  // Query SQL para obter o dado da coluna
  const query = 'SELECT cli_id FROM clientes WHERE id = ?';

  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Erro ao obter o dado:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      if (results.length > 0) {
        const dado = results[0].sua_coluna;
        res.status(200).json({ dado });
      } else {
        res.status(404).json({ message: 'Dado não encontrado' });
      }
    }
  });
});

app.post('/enviar-dados', (req, res) => {
  const dados = req.body;

  // Inicia uma transação
  connection.beginTransaction(function (err) {
    if (err) {
      console.error('Erro ao iniciar a transação:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    // Insere dados na primeira tabela (clientes)
    const queryCli = 'INSERT INTO clientes (cli_nome, cli_email, cli_telefone, cli_endereço, cli_data_nasc, cli_sexo, cli_cpf, cli_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const valuesCli = [
      dados.cli_nome, 
      dados.cli_email, 
      dados.cli_telefone, 
      dados.cli_endereco,
      dados.cli_data_nasc, 
      dados.cli_sexo, 
      dados.cli_cpf, 
      dados.cli_status
    ];

    connection.query(queryCli, valuesCli, function (error, results1) {
      if (error) {
        console.error('Erro ao inserir dados na tabela clientes:', error);
        connection.rollback(function () {
          res.status(500).json({ error: 'Erro interno do servidor' });
        });
      } else {

          // Obtenha o ID da linha recém-inserida
          const novoClienteId = results1.insertId;
          console.log('Cliente inserido com sucesso. ID:', novoClienteId);

        // Insere dados na segunda tabela (empresas)
        const queryEmpresa = 'INSERT INTO empresas (emp_cnpj, emp_situacao_cadastral, emp_data_abertura, emp_nome_empresarial, emp_atividades_economicas, emp_natureza_juridica, emp_endereço_contato, emp_capital, emp_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const valuesEmpr = [
          dados.emp_cnpj,
          dados.emp_situacao_cadastral,
          dados.emp_data_abertura,
          dados.emp_nome_empresarial,
          dados.emp_atividades_economicas,
          dados.emp_natureza_juridica,
          dados.emp_endereco_contato, 
          dados.emp_capital,
          dados.emp_status 
        ];

        connection.query(queryEmpresa, valuesEmpr, function (error, results2) {
          if (error) {
            console.error('Erro ao inserir dados na tabela empresas:', error);
            connection.rollback(function () {
              res.status(500).json({ error: 'Erro interno do servidor' });
            });
          } else {

            const novoEmpresaId = results2.insertId;
            console.log('Cliente inserido com sucesso. ID:', novoEmpresaId);

            // Insere dados na terceira tabela (estacionamentos)
            const queryEst = 'INSERT INTO estacionamentos (est_qnt_vagas, est_endereco, est_status) VALUES (?, ?, ?)';
            const valuesEst = [
              dados.est_qnt_vagas, 
              dados.est_endereco, 
              dados.est_status,
            ];
        
            connection.query(queryEst, valuesEst, function (error, results3) {
              if (error) {
                console.error('Erro ao inserir dados na tabela estacionamentos:', error);
                connection.rollback(function () {
                  res.status(500).json({ error: 'Erro interno do servidor' });
                });
              } else {

                const novoEstacId = results3.insertId;
                console.log('Cliente inserido com sucesso. ID:', novoEstacId);

                // Insere dados na quarta tabela (cli_empr)
                const queryCli_Empr = 'INSERT INTO cli_empr (cli_id, emp_id) VALUES (?, ?)';
                const valuesCli_Empr = [
                  results1.insertId, // O ID inserido na tabela clientes
                  results2.insertId, // O ID inserido na tabela empresas
                ];
                
                connection.query(queryCli_Empr, valuesCli_Empr, function (error, results4) {
                  if (error) {
                    console.error('Erro ao inserir dados na tabela cli_empr:', error);
                    connection.rollback(function () {
                      res.status(500).json({ error: 'Erro interno do servidor' });
                    });
                  } else {
                    // Insere dados na quinta tabela (empr_est)
                    const queryEmpr_Est = 'INSERT INTO empr_estac (emp_id, est_id) VALUES (?, ?)';
                    const valuesEmpr_Est = [
                      results2.insertId, // O ID inserido na tabela empresas
                      results3.insertId, // O ID inserido na tabela estacionamentos
                    ];
                    
                    connection.query(queryEmpr_Est, valuesEmpr_Est, function (error, results5) {
                      if (error) {
                        console.error('Erro ao inserir dados na tabela empr_est:', error);
                        connection.rollback(function () {
                          res.status(500).json({ error: 'Erro interno do servidor' });
                        });
                      }
                      
                      // Se todas as inserções foram bem-sucedidas, commit a transação
                      connection.commit(function (err) {
                        if (err) {
                          console.error('Erro ao cometer a transação:', err);
                          connection.rollback(function () {
                            res.status(500).json({ error: 'Erro interno do servidor' });
                          });
                        } else {
                          console.log('Dados inseridos com sucesso em todas as tabelas.');
                          res.status(200).json({ message: 'Dados inseridos com sucesso' });
                        }
                      });
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor Express está rodando na porta ${port}`);
});
