-- Categorias (Tipos de produto)
insert into tb_category (name) values ('Regatas');
insert into tb_category (name) values ('Moletons');
insert into tb_category (name) values ('Camisetas');
insert into tb_category (name) values ('Calças e Shorts');
insert into tb_category (name) values ('Bonés');
insert into tb_category (name) values ('Acessórios');

-- Produtos (Exemplos de itens por categoria e time)
insert into tb_product (name, description, price, category_id) values ('Regata Lakers LeBron James', 'Regata oficial do LeBron James - Los Angeles Lakers', 499.90, 1);
insert into tb_product (name, description, price, category_id) values ('Regata Golden State Curry', 'Regata oficial do Stephen Curry - Golden State Warriors', 499.90, 1);
insert into tb_product (name, description, price, category_id) values ('Moletom Boston Celtics', 'Moletom verde oficial do Boston Celtics', 279.90, 2);
insert into tb_product (name, description, price, category_id) values ('Camiseta Chicago Bulls', 'Camiseta casual preta com logo dos Bulls', 119.90, 3);
insert into tb_product (name, description, price, category_id) values ('Shorts Miami Heat', 'Shorts oficiais de jogo do Miami Heat', 149.90, 4);
insert into tb_product (name, description, price, category_id) values ('Boné Milwaukee Bucks', 'Boné com logo bordado dos Bucks', 99.90, 5);
insert into tb_product (name, description, price, category_id) values ('Chaveiro Dallas Mavericks', 'Chaveiro oficial dos Mavericks em metal', 29.90, 6);
insert into tb_product (name, description, price, category_id) values ('Pulseira Toronto Raptors', 'Pulseira de silicone oficial dos Raptors', 19.90, 6);
insert into tb_product (name, description, price, category_id) values ('Calça Cleveland Cavaliers', 'Calça de treino oficial dos Cavs', 169.90, 4);

-- Usuários
INSERT INTO tb_user(display_name, username, password) VALUES ('Administrador', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO tb_user(display_name, username, password) VALUES ('Teste', 'test','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');

