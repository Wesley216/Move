# Move

# NLW 4 - Trilha React.js

Este projeto foi com React no framework Next.js, CSS Modules, Typescript,Context API e utilizando uma biblioteca de cookies js-cookie

## Anotações

* Next.js

 O Next substitui o create-react-app, é um ótimo framework para quem busca aprender mais fácil a biblioteca React pois é criado em cima do React. O Next permite criações em 3 tipos de conceitos muito valiosos para o front-end: SPA(Single Page Aplication), SSR(Server Side Rendering) e SSG(Static Side Generation) e tambem busca em melhorar o SEO(Search Engineer Otimization), e vai muito além os benifícios desse famework.

* CSS Modules

Usado para que o CSS puro não afete outras páginas, restringe o CSS apenas ao componente no caso dessa aplicação. Ex: na pasta src/components/ExperienceBar.tsx foi importado o css com o nome 'style' e nas classes usadas {style.[nome da classe definida no css importado]}

* Context API 

É a API de contexto do React, com ele é possível fazer comunicação entre componentes. Dentro de um contexto é possível passar objetos, funções e entre outras coisas, mas no site da vercel vem falando mais sobre essa API.

## Comando de criação do app

```bash
- npx create-next-app move-next - Cria o projeto em next
- npm i typescript @types/react @types/react-dom @types/node -D - Instala typescript na aplicação
- npm run dev - Roda o projeto
- npm i js-cookie
```
## Clone para rodar o app   
   ``` git bash
   $ git clone https: //github.com/Wesley216/move
   $ cs move-next
   $ npm install
   $ npm run dev
   ```
