# Backend-Teste-Jack
Um projeto feito para um teste técnico. O projeto consiste em um task manager com back-end e front-end. Esse é o repositório APENAS do back-end. 
O back-end consiste em uma API REST onde um usuário pode se registrar e logar na aplicação. Após logado, ele pode fazer as operações de CRUD em uma base de dados de tasks.

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

A documentação dos endpoints foi feita via swagger e para acessa-la, com o projeto rodando, vá até [localhost:3000/api] (https://localhost:3000/api)

# Registrando usuário e fazendo login

Antes de começar a acessar as funções de criar, visualizar, alterar e deletar tasks, o usuário deve estar logado. 

### Criando novo usuário / Fazendo login

Para criar um novo usuário, vá até a rota POST users/register. Faça uma requisição passando e-mail e senha.
Exemplo de body: 
`
{
  "email": "teste@teste.com",
  "password": "senhateste"
}
`
Feito isto, pode ir até a roda POST /auth/signin e passe o e-mail e senha criados no passo anterior. Se o login estiver correto, você vai receber na resposta um
access_token. Guarde este token, é com ele que você vai conseguir acessar rotas protegidas das tasks. 

### Acessando as rotas protegidas
Agora que você tem um token de acesso, ao acessar as rotas de TASKS, você deve passar este token nos HEADERS da sua requisição
Crie um HEADER chamado Authorization, e passe para ele `Bearer $token` onde $token recebe o valor do token de acesso que conseguiu no passo anterior