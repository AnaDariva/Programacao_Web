# E-Commerce para Aula de Programação para Web

## Escopo do Projeto

O site de comércio eletrônico desenvolvido como projeto final deverá exibir todos os produtos ofertados mesmo que o cliente não esteja autenticado na aplicação. Cada produto também deverá ser exibido em uma página única com os detalhes desse produto, como a descrição, por exemplo. Os produtos devem ser exibidos em páginas para melhor visualização. Os clientes deverão poder filtrar os produtos por categoria.

Os clientes deverão poder adicionar produtos em um carrinho de compras. O carrinho de compras deve possibilitar editar a quantidade de produtos, a remoção de um produto ou a remoção de todos os produtos. O carrinho de compras deve estar disponível mesmo para clientes não autenticados.

Os clientes que desejarem finalizar uma compra deverão estar cadastrados e autenticados no sistema. Ou seja, ao finalizar compra caso o cliente não esteja autenticado, deverá ser exibida uma página para autenticação. Caso o cliente não esteja cadastrado a página de autenticação deve possuir um link para uma página de cadastro. Após cadastrado e autenticado o cliente poderá finalizar sua compra.

Antes de finalizar a compra, deverá ser exibida uma tela de confirmação de endereço e dos itens comprados. Nessa tela o cliente deverá selecionar o endereço de entrega do pedido caso já tenha o endereço cadastrado. Caso necessário esse cliente poderá cadastrar um novo endereço. O cliente também deverá informar um método de pagamento, e após todos os dados preenchidos poderá finalizar o pedido.

Os clientes deverão poder consultar seu histórico de compras com o detalhe dos produtos comprados.

## Requisitos Mínimos

- Página para listar todos os produtos, com nome, valor e imagem (pode ser uma URL externa).
- Página para exibir detalhes de um produto: nome, valor, descrição, imagem e botão para adicionar ao carrinho.
- Página de carrinho de compras:
  - Listar os itens adicionados.
  - Ajustar a quantidade de itens.
  - Botão para ir para a tela de finalização da compra.
- Telas para cadastro e autenticação de cliente.
  - Não permitir usuários com o mesmo nome.
- Tela de resumo da compra (endereço, itens, método de pagamento).
- Finalização da compra envia os dados ao servidor.
- As páginas de lista de produtos, produto individual e carrinho devem estar disponíveis para todos os usuários.

## Requisitos Extras

- Página para listar os pedidos realizados pelo usuário.
- Filtro de produtos por categoria.
- Paginação na lista de produtos.
- Cadastro de múltiplos endereços de entrega por usuário.
- Uso de API de CEP (como o ViaCEP) para facilitar o cadastro de endereços.
