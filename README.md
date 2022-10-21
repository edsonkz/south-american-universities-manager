# south-american-universities-manager
Implementação de uma API CRUD responsável por gerência informações de universidades utilizando Node.js e MongoDB como banco de dados. Além disso, o projeto possui um script para popular o banco de dados com os seguintes países: Brasil, Argentina, Chile, Colombia, Paraguai, Peru, Suriname e Uruguai através das consultas a API http://universities.hipolabs.com.
## Instalação e Execução
É necessário possuir o ambiente Node.js instalado para executar este projeto. Versão Node.js testada: v16.18.0.
No arquivo src/database/db.js o projeto está configurado para rodar o MongoDB local na porta padrão (27017). Foi utilizada a versão 6.0.2 do MongoDB.
A aplicação principal roda no PORT 3333.
1. Clonar este repositóiro
2. Utilizar `npm install` na pasta raiz do projeto pelo seu terminal preferido
4. Agora você pode utilizar os comandos:
    * `npm start` para iniciar a aplicação em modo produção. Utilize `Ctrl + C` para finalizar a aplicação no terminal em que a mesma está executando.
    * `npm run populate` para popular o banco de dados. Recomendado utilizar apenas uma primeira vez num banco de dados vazio.
## Frameworks e Tecnologias Utilizadas
* Javascript utilizando Ambiente Node.js como base
* Banco de dados MongoDB local
* Mongoose como driver do MongoDB
* Mongoose-paginate-v2 para facilitar a implementação da paginação da rota `[GET] /universities`
* Express.js para criação da API e de suas rotas
* Esm para poder utilizar padrões ECMAScript na confecção do código
* Axios utilizado no script para popular o banco de dados, fazendo consulta na API citada no começo
## Rotas
* `[GET]/universities`   Listar todas as universidades da base de dados, utilizando o sistema de paginação para não sobrecarregar a REQUEST. Utilize na `url` `size` para definir quantas universidades devem retornar por página (máximo são 20) e `page` para definir qual página deseja acessar. O `size` padrão é 20. É possível filtrar por países. Exemplo : `/universities?country=Brazil`
* `[GET]/universities/{id}` Obter a informação somente de uma universidade
* `[POST]/universities` Adicionar uma nova universidade (universidades não podem ter o mesmo nome, estado e país)
* `[PUT]/universities/{id}` Atualizar uma universidade baseado no id (só é possível alterar o nome, domínios e as páginas da web)
* `[DELETE]/universities/{id}` Remover uma universidade baseado no id
## Schema Universidade
```
name: { type: String, required: true },
	country: { type: String, required: true },
	"state-province": { type: String, required: false, default: null },
	alpha_two_code: {
		type: String,
		required: true,
		maxLength: 2,
		minLength: 2,
	},
	domains: [{ _id: false, type: String, required: false }],
	web_pages: [{ _id: false, type: String, required: false }]
  ```
