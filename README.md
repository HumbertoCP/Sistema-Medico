

# Backend de um sistema médico que suporta as seguintes operações:
- Insert
- Update
- Select
- Soft Delete

## Tecnologias

O projeto foi desenvolvido em :
- Node.JS
- NestJS (Framework do Node.JS)
- Typescript
- TypeORM
- MySQL
- Docker

## Executando o projeto

Para clonar o projeto:

``git clone https://github.com/HumbertoCP/Sistema-Medico``

Na pasta raiz do projeto, crie um arquivo chamado ``.env`` e nele insira:<br>
``
DB_USERNAME=<O nome do seu banco aqui><br>
DB_PASSWROD=<A senha do seu banco aqui><br>
``
O docker-compose irá criar um banco com as credenciais que foram passadas, e posteriormente, elas serão usadas para o login

Tendo em sua máquina o Docker, Node.JS e o MySQL instalados, execute o comando:

``docker-compose up``

## Migrations (Populando o banco)

Para popular o banco de dados com as especialidades médicas, após executar o projeto, com o cmd na pasta, execute o comando:

``npm run migrations:run``


## Documentação da API

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c2ad4cf0fb71327841b1?action=collection%2Fimport)

## Testes
