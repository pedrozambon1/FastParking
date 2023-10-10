create schema if not exists Fastparking
default charset utf8
default collate utf8_general_ci;

use fastparking;

create table if not exists clientes (
cli_id int primary key auto_increment,
cli_nome varchar (60) not null,
cli_email varchar (60) unique,
cli_telefone varchar (12) not null,
cli_endereço  varchar (200) not null,
cli_data_nasc date,
cli_sexo enum ("M","F"),
cli_cpf varchar(11),
cli_status bit
);

create table if not exists empresas(
emp_id int primary key auto_increment,
emp_cnpj varchar (14) not null,
emp_situacao_cadastral enum ("ativa", "inativa", "suspensa", "baixada", "inapta", "atividade_rural", "MEI", "estrangeira", "concordata", "recuperacão judicial") not null,
emp_data_abertura date not null,
emp_nome_empresarial varchar (100),
emp_atividades_economicas varchar (255),
emp_natureza_juridica varchar(255),
emp_endereço_contato varchar(255),
emp_capital smallint,
emp_status bit
);

create table if not exists estacionamentos(
est_id int primary key auto_increment,
est_qnt_vagas int not null,
est_endereco varchar (200) not null,
est_status bit
);

create table if not exists  cli_empr(
cli_id int, 
emp_id int,
primary key (cli_id, emp_id),
foreign key (cli_id) references clientes(cli_id),
foreign key (emp_id) references empresas(emp_id)
);

create table if not exists  empr_estac(
emp_id int, 
est_id int,
primary key (emp_id, est_id),
foreign key (emp_id) references empresas(emp_id),
foreign key (est_id) references estacionamentos(est_id)
);

