<h1 align="center">▣ E-Commerce Web</h1>

<p align="center">
  Aplicação de comércio eletrônico desenvolvida como projeto final da disciplina de Programação para Web.
</p>

---

<div align="center">

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![H2 Database](https://img.shields.io/badge/H2%20Database-004088?style=for-the-badge)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

</div>

---

## ▣ Sobre o projeto

O **E-Commerce Web** é uma aplicação de comércio eletrônico desenvolvida como projeto final da disciplina de **Programação para Web**.

A aplicação simula uma plataforma de compras online completa, permitindo que usuários naveguem por produtos e categorias, adicionem itens ao carrinho, realizem autenticação, cadastrem endereços, finalizem pedidos e acompanhem o histórico de compras.

O projeto é dividido em dois módulos principais:

- `server/` — API RESTful desenvolvida com **Spring Boot**
- `client/` — cliente web desenvolvido com **React.js**, **TypeScript**, **Vite**, **HTML** e **CSS**

> Projeto acadêmico desenvolvido com foco em arquitetura cliente-servidor, integração entre frontend e backend, consumo de API REST e persistência de dados.

---

## ▣ Objetivo do trabalho

- Desenvolver uma aplicação web completa no modelo cliente-servidor.
- Implementar uma API RESTful utilizando Spring Boot.
- Criar uma interface web responsiva com React.js e Vite.
- Integrar frontend, backend e banco de dados.
- Aplicar boas práticas de organização, versionamento e arquitetura em aplicações web modernas.
- Simular o fluxo principal de uma loja virtual, desde a listagem de produtos até a finalização de pedidos.

---

## ▣ Funcionalidades

### Backend — `server/`

- Cadastro e autenticação de usuários
- Gerenciamento de produtos e categorias
- Busca de produtos por ID
- Busca de produtos por categoria
- Gerenciamento de carrinho de compras via API
- Cadastro e listagem de pedidos
- Gerenciamento de endereços
- Integração com banco de dados H2

### Frontend — `client/`

- Listagem de produtos e categorias
- Página de detalhes do produto
- Carrinho de compras com edição e remoção de itens
- Cadastro e login de usuários
- Cadastro de endereços
- Tela de finalização de pedido
- Histórico de pedidos do usuário
- Interface estilizada com HTML, CSS e Tailwind CSS

---

## ▣ Tecnologias utilizadas

### Linguagens

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" width="40" height="40"/>
</div>

### Frameworks e bibliotecas

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" width="40" height="40"/>
</div>

### Ferramentas e tecnologias

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-plain.svg" alt="Postman" width="40" height="40"/>
</div>

---

## ▣ Banco de dados

O projeto utiliza o **H2 Database**, um banco de dados em memória executado durante o tempo de execução da aplicação.

Essa escolha facilita os testes e a execução local do projeto, sem a necessidade de configuração inicial de um banco externo.

---

## ▣ Estrutura do projeto

```bash
E-Commerce-Web/
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── server/
│   ├── src/
│   └── pom.xml
└── README.md
```

---

## ▣ Como executar o projeto

Para executar o projeto localmente, siga os passos abaixo:

1. Clone este repositório:

```bash
git clone LINK_DO_REPOSITORIO_AQUI
```

2. Acesse a pasta do projeto:

```bash
cd NOME_DA_PASTA_DO_PROJETO
```

3. Execute o backend:

```bash
cd server
```

Em seguida, execute a aplicação Spring Boot pela sua IDE ou pelo terminal, conforme a configuração do projeto.

4. Execute o frontend:

```bash
cd client
npm install
npm run dev
```

5. Acesse a aplicação no navegador pelo endereço indicado pelo Vite.

> Observação: o backend precisa estar em execução para que o frontend consiga consumir os dados da API corretamente.

---

## ▣ Contexto acadêmico

Este projeto foi desenvolvido como parte da disciplina de **Programação para Web**, com o objetivo de aplicar conceitos de desenvolvimento web moderno, construção de APIs RESTful, integração entre cliente e servidor, autenticação, manipulação de dados e desenvolvimento de interfaces responsivas.

---

## ▣ Autora

- **Ana Luísa Dariva Ramos** - Acadêmica de Análise e Desenvolvimento de Sistemas na UTFPR-PB

---

<p align="center">
  Desenvolvido como projeto acadêmico ▣
</p>
