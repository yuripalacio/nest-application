<p align="center">
  É um framework que diferente do Express (Fastify pra HTTP), por exemplo, ele é muito mais opinado.
  Temos muito mais receitas para fazer as coisas e não fazer da forma que queremos.

  A vantagem disso é quando estamos em um abiente onde não tem uma pessoa no time ou na área que irá guiar o time nas escolhas técnicas e tomar todas as melhores decisões e precisamos de produtividade. Nesse cenário temos um ótimo case para aplicar o NestJS, pois ele vai trazer a opinião própria e perdemos menos tempo pensando em quam biblioteca temos de utilizar para solucionar uma questão X ou Y.

  Extremamente produtivo, permite que façamos a extrutura de pastas da forma como acharmos melhor. Temos decisões mais prontas no quisito ferramental e liberdade extrutural.
</p>

Uso muito forte de decorators dentro do TypeScript.
É uma função que adiciona comportamento em algo (pode ser aplicado em "qualquer coisa").

Uso muito forte também de inversão de dependência.

controller -> Porta de entrada para a nossa aplicação (geralmente via HTTP);
No nest é identificado por meio do decorator @Controller.
Essa classe vai conter métodos que são rotas, essas rota são identificados pelo decorators do método HTTP (@Get, @Post, ...)

module -> É o arquivo que reúne todas as coisas, controllers, configurações, conexão com banco de dados, etc..
Todo módulo é uma classe (geralmente vazia) que tem um decorator @Module.
Recebe primariamente os controllers e todas as dependências que os controllers podem ter. Com isso, a injeção de dependência ocorre de forma automática.
Mas é necessário que tenha o decorator @Injectable.

service -> Tudo o que não é controller será um provider. (Caso de uso, envio de e-mail)
Tudo o que não recebe request HTTP é um provider.

Pra cada rota da aplicação ter um arquivo de controller diferente.
É comum quando aprendemos MVC um controler armazernar várias rotas da aplicação.
Chega um determinado momento que acontecem 2 problemas.
  1. Surge uma nova rota e a gente não sabe em qual controller a gente coloca, pois a rota está ligada a várias partes da aplicação;
    Por exemplo, temos um controller de grupo e um de usuário, e quero criar uma rota que adiciona um usuário em um grupo específico, onde colocar?

Rota para criar uma conta, criar o controller `create-account.controller.ts`.

Os pipes podem ser considerados como middlewares, tem o papel de interceptar algo.