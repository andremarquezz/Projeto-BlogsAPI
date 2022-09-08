<img src="https://img.shields.io/github/issues/andremarquezz/Projeto-BlogsAPI"/> <img src="https://img.shields.io/github/forks/andremarquezz/Projeto-BlogsAPI"/> <img src="https://img.shields.io/github/stars/andremarquezz/Projeto-BlogsAPI"/>

<h1 align="center">Projeto Blogs API</h1>
<p align="center">Uma API e um banco de dados para a produção de conteúdo para um blog!</p>

# Sumário

</br>

• [Sobre o Projeto](#-sobre-o-projeto)

• [Tecnologias e Bibliotecas](#-tecnologias-e-bibliotecas-utilizadas-no-desenvolvimento-do-projeto)

• [Como executar o projeto](#-como-executar-o-projeto)

• [Sobre os Endpoints](#-sobre-os-endpoints)

• [Dicas de scripts prontos](#-dicas-de-scripts-prontos)

### 📃 Sobre o Projeto

---

<p>Desenvolvida durante o curso da Trybe esta API RESTful é para a produção de conteúdo para um blog em que é possível criar, visualizar, atualizar e deletar posts, seguindo a arquitetura MSC e foi utilizado um banco de dados MySQL, para realizar as requisições é necessario estar autenticado com um token JWT.
A API foi desenvolvida dentro de containers docker utilizando um container Node.js e um container MySQL</p>

---

### 🛠 Tecnologias e Bibliotecas utilizadas no desenvolvimento do projeto

- **[Node.js](https://nodejs.org/en/)**

- **[MySQL](https://www.mysql.com/products/workbench/)**

- **[Sequelize](https://sequelize.org/docs/v6/getting-started/)**

- **[Express](http://expressjs.com/pt-br/)**

- **[jsonwebtoken](https://jwt.io/)**

  > Veja o arquivo [package.json](https://github.com/andremarquezz/Projeto-BlogsAPI/blob/main/package.json)


---


### ✒ Sobre os Endpoints

 - Todos os endpoints com metodos e corpo da requisição listados abaixo obrigatoriamente necessitam do corpo da requisição no formato do exemplo.

---
<details>
  <summary>Todos os Endpoints</summary>
  <img src="https://github.com/andremarquezz/Projeto-BlogsAPI/blob/main/rotas.png"/>
  
  </details>
  
  ---
  
 <details>
  <summary>Corpo da requisição dos endpoints</summary>
  
  </br>
  
   <details>
  <summary><strong>/login</strong></summary>
  
  ```json
 {
  "email": "lewishamilton@gmail.com",
  "password": "123456"
}
```

---
  </details>
  
  </br>
  
  <details>
  <summary><strong>/user</strong></summary>
  
  ### post
  
 ```json
 {
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```

---

  </details>
  
  </br>
  
  <details>
  <summary><strong>/categories</strong></summary>
  
   ### post
  
 ```json
 {
  "name": "Typescript"
}
```

---

</details>

</br>
  
   <details>
  <summary><strong>/post/{id}</strong></summary>
  
   ### put
  
 ```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```

---
  </details>
  
  </details>

---

### 🚀 Como executar o projeto

_Pré-requisitos_

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com),
[Node.js](https://nodejs.org/en/).

É recomendado utilizar algum cliente HTTP, como [Postman](https://www.postman.com/) ou o [Insomnia](https://insomnia.rest/download).

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

---

_1- Clonar o repositorio_

```jsx
git@github.com:andremarquezz/Projeto-BlogsAPI.git
```

---


<details>
  <summary><strong>:whale: Rodando no Docker</strong></summary><br />
  
  ## Com Docker
 
 
_Rode o serviço `node` com o comando_

```jsx
docker-compose up -d
```

- Esse serviço irá inicializar dois containers chamados `blogs_api e blogs_api_db`, respectivamente.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

_Via CLI use o comando_
```jsx
docker exec -it blogs_api bash
```
- Ele te dará acesso ao terminal interativo do container blogs_api(node) criado pelo compose, que está rodando em segundo plano.

_Instale as dependências `dentro do container` com_

```jsx
npm install
```

⚠️Atenção: Caso opte por utilizar o Docker, TODOS os scripts disponíveis no package.json devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec.
  
  </details>
  
---
  
<details>
  <summary><strong>:computer: Rodando Localmente</strong></summary><br />
 
 _Instale as dependências com o comando_
 
 ```jsx
npm install
```
- Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `node` instalado em seu computador.
  - Recomenda-se a versão `^16`
  
 ⚠️Atenção: Não esqueça de renomear/configurar o arquivo .env.example
</details>

---

### 💡 Dicas de scripts prontos
<details>
  <summary><strong>Scripts</strong></summary><br />

  - Criar o banco de dados e gerar as tabelas:
  ```sh
    npm run prestart
  ```
  
   - Popular o o banco de dados:
  ```sh
    npm run seed
  ```

  - Dropar o banco de dados:
  ```sh
    npm run drop
  ```

  - Iniciar o servidor Node:
  ```sh
    npm start
  ```

  - Iniciar o servidor Node com nodemon:
  ```sh
    npm run dev
  ```
  
  - Rodar os testes:
  ```sh
    npm test
  ```
  
  - Rodar coverage para ver a cobertura dos testes:
  ```sh
    npm run test:coverage
  ```

  <br />
</details>

---
