# 📒 Agenda de Contatos --- Projeto Angular

Este projeto foi desenvolvido para estudos da disciplina de
**Programação Front-End**, utilizando **Angular**, **TypeScript** e
**Bootstrap**.\
O objetivo é criar uma **Agenda de Contatos** moderna, simples e
funcional.

------------------------------------------------------------------------

## 🚀 Funcionalidades

-   ✅ Adicionar novos contatos\
-   ✏️ Validações completas (nome, e-mail e telefone)\
-   🗂️ Listagem de contatos em tabela estilizada\
-   ❌ Remoção de contatos\
-   🌞🌙 Alternância entre tema claro e escuro\
-   💾 Salvamento automático no LocalStorage\
-   🔔 Notificações de sucesso e erro\
-   💅 Interface moderna com Bootstrap 5\
-   📱 Layout responsivo

------------------------------------------------------------------------

## 🖥️ Tecnologias Utilizadas

-   **Angular 17+**\
-   **TypeScript**\
-   **Bootstrap 5**\
-   **HTML5 / CSS3**\
-   **LocalStorage (persistência)**

------------------------------------------------------------------------

## 📁 Estrutura do Projeto

```
    agenda/
    ├── .angular/
    ├── .vscode/
    ├── node_modules/
    ├── public/
    └── src/
        ├── app/
        │   ├── components/
        │   │   ├── contato-edit/
        │   │   └── contato-list/
        │   ├── models/
        │   │   ├── contato.model.ts
        │   │   └── contato.model.spec.ts
        │   ├── services/
        │   │   ├── contato.ts
        │   │   └── contato.spec.ts
        │   ├── app.config.ts
        │   ├── app.css
        │   ├── app.html
        │   ├── app.routes.ts
        │   ├── app.spec.ts
        │   └── app.ts
        ├── main.ts
        ├── styles.css
        └── index.html
```

------------------------------------------------------------------------

## ⚙️ Como Rodar o Projeto

### 1️⃣ Clonar o repositório

``` bash
git clone https://github.com/brunamoreirs/projetos-faculdade/tree/main/programacao-front-end/agenda
cd agenda
```

### 2️⃣ Instalar dependências

``` bash
npm install
```

### 3️⃣ Rodar o servidor de desenvolvimento

``` bash
ng serve
```

Acesse no navegador:\
👉 **http://localhost:4200**

------------------------------------------------------------------------

## ✔️ Validações Implementadas

-   **Nome:** mínimo de 3 caracteres\
-   **E-mail:** formato válido obrigatório\
-   **Telefone:** apenas números, mínimo de 8 dígitos\
-   ⚠️ Caso algum campo esteja incorreto → aparece alerta 🔔

------------------------------------------------------------------------

## 🎨 Tema Claro/Escuro

-   Alternância através de um botão 🌞/🌙\
-   Animação suave ao trocar\
-   Tema salvo automaticamente no LocalStorage

------------------------------------------------------------------------

## 📈 Melhorias Futuras

-   🔍 Busca para filtrar contatos\
-   🔁 Edição de contato\
-   ⬇️ Exportar lista de contatos (.csv)\
-   🖼️ Avatar com iniciais\
-   🔒 Integração com backend

------------------------------------------------------------------------

## 🧑‍💻 Autoria

Feito com ❤️ por **Bruna Moreira**\
📅 Projeto acadêmico --- *Disciplina de Programação Front-End*
