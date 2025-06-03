
=======
# 🛒 E-Commerce Web - Projeto Final

**Aplicação de Comércio Eletrônico** desenvolvida como projeto final da disciplina de **Programação para Web**.

📁 O projeto é dividido em dois módulos principais:
- `server/` – API RESTful desenvolvida com **Spring Boot**.
- `client/` – Cliente Web desenvolvido com **React.js**, **TypeScript**, **HTML** e **CSS**.

---

<h2 align="left">🖥️ Tecnologias Utilizadas</h2>

### 👩‍💻 Languages  
<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" width="40" height="40"/>
</div>

### ⚙️ Frameworks & Libraries  
<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" width="40" height="40"/>
</div>

### 🧰 Tools & Technologies  
<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-plain.svg" alt="Postman" width="40" height="40"/>
  <img src="https://www.svgrepo.com/show/331760/h2.svg" alt="H2 Database" width="40" height="40"/>
</div>

---

## 📌 Descrição do Projeto

A aplicação é uma **plataforma de compras online** completa, onde os usuários podem:
- Navegar por produtos e categorias
- Adicionar itens ao carrinho (mesmo sem login)
- Finalizar compras com autenticação
- Gerenciar endereços
- Visualizar histórico de pedidos

---

## 🎯 Objetivo do Trabalho

- Criar uma aplicação **cliente-servidor Web com acesso a banco de dados**.
- Implementar uma **API RESTful** com Spring Boot.
- Desenvolver uma **interface web responsiva** com React.js.
- Aplicar boas práticas de arquitetura em aplicações web modernas.

---

## 🛠️ Funcionalidades Implementadas

### Backend (`server/`):
- ✅ Cadastro e autenticação de usuários
- ✅ Gerenciamento de produtos e categorias
- ✅ Busca de produtos por ID e categoria
- ✅ Gerenciamento de carrinho de compras (API)
- ✅ Cadastro e listagem de pedidos
- ✅ Gerenciamento de endereços
- ✅ Integração com banco de dados H2

### Frontend (`client/`):
- ✅ Listagem de produtos e categorias
- ✅ Página de detalhes de produto
- ✅ Carrinho de compras (com edição e remoção)
- ✅ Cadastro e login de usuários
- ✅ Cadastro de endereços
- ✅ Tela de finalização de pedido
- ✅ Histórico de pedidos do usuário
- ✅ Interface estilizada com HTML + CSS

---

## 🏗️ Ferramentas e Requisitos

### Backend
- Java JDK 21+
- Spring Boot, Spring Web, Spring Data JPA
- Banco de Dados: H2 (em memória)
- IDE: IntelliJ ou Eclipse
- Testes: Postman ou Insomnia

### Frontend
- React.js com TypeScript
- HTML & CSS
- Node.js & npm
- IDE: VS Code ou WebStorm

---

## 🗄️ Banco de Dados

O projeto utiliza **H2 Database**, que é executado em memória durante o tempo de execução. 

---

## 👩‍💻 Autor
- **Ana Luisa Dariva Ramos** - Acadêmica de Análise e Desenvolvimento de Sistemas na UTFPR-PB  
>>>>>>> 7f6636c1c71d3d03307a0109e46b48abb9dd0f5f

---

## ⚙️ Configuração do Frontend (React + TypeScript + Vite + ESLint)

Para o frontend, usamos React com Vite e TypeScript. Recomendamos configurar ESLint para uma melhor qualidade do código, com regras tipo-aware para TypeScript e plugins específicos para React.

Exemplo básico do arquivo `eslint.config.js`:

```js
import tseslint from 'typescript-eslint-language-service';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
  ],
  plugins: {
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});