# Backend - Project (WIP)

Esse é um projeto em progresso

Futuras implementações

* Testes
* Teste E2E (Robot Framework)
* Implementação Swagger
* Adição NGIX com docker

## Tópicos
- configuração de ambiente

## Configuração de ambiente
- configuração de ambientes
- extras

##### Configuração de ambientes
1- Instalação das dependências
```sh
yarn
```

2- Subir o servidor local em ambiente de desenvolvimento
```sh
yarn start:dev
```

##### Extras

1- No projeto também se encontra um arquivo **docker-compose**, para a utlização do mesmo é necessário a atualização ter acesso ao banco de dados de desenvolvimento relizar um dump da base e atualização.

2- Criar banco de dados localmente
```sh
yarn compose:up
```