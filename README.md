# Backend-Teste-Jack
Um projeto feito para um teste técnico. O projeto consiste em um task manager com back-end e front-end. Esse é o repositório APENAS do back-end. 
O back-end consiste em uma API REST onde um usuário pode se registrar e logar na aplicação. Após logado, ele pode fazer as operações de CRUD em uma base de dados de tasks.
## Pré-requisitos

Antes de iniciar, certifique-se de ter o **Node.js** e o **npm** instalados na sua máquina:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

## Objetivo
O objetivo do projeto foi verificar e expandir minhas habilidades com desenvolvimento de APIs utilizando Nest e Typescript. Com este projeto fixei conhecimentos e aprendi melhor sobre: 
- Documentação de APIs
- Autorização e Autenticação
- Boas práticas com status codes HTTP
- Tratamendo de erros e lançamento de exceptions

# Rodando o Projeto
Para rodar o projeto em sua máquina, primerio clone o repositório: 
`git clone https://github.com/Zezola/backend-teste-jack`

Em seguida, navegue até a pasta do projeto
`cd backend-teste-jack`

Na pasta do projeto, rode `npm install`

Feito isso, pode rodar o projeto com `nest start`

# Documentação e end-points


A documentação dos endpoints foi gerada automaticamente utilizando **Swagger**. Após iniciar o servidor, acesse:

[http://localhost:3000/api](http://localhost:3000/api)

## Registrando usuário e fazendo login

Para acessar as rotas de criação, visualização, atualização e exclusão de tarefas, o usuário deve estar autenticado. 

### Criar um novo usuário

Envie uma requisição **POST** para a rota `/users/register` com o seguinte payload no corpo da requisição:

`
{
  "email": "teste@teste.com",
  "password": "senhateste"
}
`
### Fazendo login e cessando as rotas protegidas
Nas requisições subsequentes às rotas protegidas, como as de tarefas, inclua o token de acesso no cabeçalho Authorization no formato:
Authorization: Bearer <access_token>

### Proximos Passos
- Implementar testes unitários e de integração
- Adicionar suporte para múltiplos usuários e permissões diferenciadas
- Melhorar a validação de dados