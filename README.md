# Cripto Oficinas

Aplicação web fullstack para cadastro e gerenciamento de oficinas de treinamento, construída com Node.js, Express, Express Generator (estrutura equivalente), Handlebars e Bootstrap 5.

## Requisitos

- Node.js 18 ou superior
- npm

## Como executar

1. Extraia o arquivo ZIP.
2. Abra a pasta do projeto no VS Code.
3. No terminal, execute:

   ```bash
   npm install
   npm start
   ```

4. Acesse http://localhost:3000.

## Estrutura

```text
catalogo-oficinas/
├── bin/www
├── controller/oficinaController.js
├── model/oficina.js
├── routes/
│   ├── index.js
│   ├── oficinas.js
│   ├── pesquisa.js
│   └── sobre.js
├── views/
│   ├── layouts/main.hbs
│   ├── oficinas/form.hbs
│   ├── oficinas/detalhes.hbs
│   ├── index.hbs
│   ├── pesquisa.hbs
│   ├── sobre.hbs
│   └── error.hbs
├── public/css/style.css
├── public/js/app.js
├── app.js
└── package.json
```

## Funcionalidades

- Listagem geral e filtro de inscrições abertas.
- Indicadores calculados sobre o catálogo completo.
- Cadastro, consulta, edição e exclusão com modal de confirmação.
- Alternância entre inscrições abertas e encerradas.
- Pesquisa por parte do título, sem diferenciar maiúsculas/minúsculas.
- Página Sobre.
- Validação no servidor e no formulário da carga horária (inteiro entre 1 e 40).

## Observações

- Os registros ficam somente em memória. Ao reiniciar o servidor, o catálogo volta a ficar vazio, conforme solicitado no enunciado.

- Para testar o resumo, cadastre duas oficinas com 4 h e 6 h; encerre as inscrições da oficina de 6 h. O resumo deverá mostrar 2 oficinas, 1 aberta, 1 encerrada e 4 h abertas.
