-- Categorias (Tipos de produto)
insert into tb_category (name) values ('Regatas');
insert into tb_category (name) values ('Moletons');
insert into tb_category (name) values ('Camisetas');
insert into tb_category (name) values ('Calças e Shorts');
insert into tb_category (name) values ('Bonés');
insert into tb_category (name) values ('Acessórios');

-- Produtos (Exemplos de itens por categoria e time)
insert into tb_product (name, description, price, category_id, image_url) values ('Regata Lakers LeBron James', 'Regata oficial do LeBron James - Los Angeles Lakers', 499.90, 1, 'https://acdn-us.mitiendanube.com/stores/001/986/628/products/camiseta-los-angeles-lakers-lebron-james-jordan-swingman-roxo-11-d55f8deff31cd88d4616438476414223-640-0.jpg');
insert into tb_product (name, description, price, category_id, image_url) values ('Regata Golden State Curry', 'Regata oficial do Stephen Curry - Golden State Warriors', 499.90, 1, 'https://acdn-us.mitiendanube.com/stores/001/226/115/products/regata-nba-nike-swingman-golden-state-warriors-branca-curry-301-0bd1a035f1fb21fdad15913954396439-640-0.jpg');
insert into tb_product (name, description, price, category_id, image_url) values ('Moletom Boston Celtics', 'Moletom verde oficial do Boston Celtics', 279.90, 2, 'https://cdn.awsli.com.br/2500x2500/59/59657/produto/57875474/610b01c669.jpg');
insert into tb_product (name, description, price, category_id, image_url) values ('Camiseta Chicago Bulls', 'Camiseta casual preta com logo dos Bulls', 119.90, 3, 'https://images.tcdn.com.br/img/img_prod/710966/camiseta_new_era_nba_chicago_bulls_basic_time_preta_1535_1_a0c07e05c981ca7301a90a4abf0143aa_20210714094603.jpg');
insert into tb_product (name, description, price, category_id, image_url) values ('Shorts Miami Heat', 'Shorts oficiais de jogo do Miami Heat', 149.90, 4, 'https://acdn-us.mitiendanube.com/stores/001/055/309/products/miami-heat-icon-edition-short-preto-vermelho-amarelo-escuro-nike-basquete-nba-bermuda-jersey-oficial-original-licenciada-qualidade-masculina-confiavel-loja-51-2bb07733c5777187b316923017531240-1024-1024.jpg');
insert into tb_product (name, description, price, category_id, image_url) values ('Boné Milwaukee Bucks', 'Boné com logo bordado dos Bucks', 99.90, 5, 'https://static.prospin.com.br/media/catalog/product/cache/6e59e4946046b080cb91aa3230980e44/n/b/nbv18bon406-bone-new-era-9forty-nba-milwaukee-bucks.jpg');
insert into tb_product (name, description, price, category_id, image_url) values ('Chaveiro Dallas Mavericks', 'Chaveiro oficial dos Mavericks em metal', 29.90, 6, 'https://m.media-amazon.com/images/I/81Yb-ueWAxL._AC_UF1000,1000_QL80_.jpg');
insert into tb_product (name, description, price, category_id, image_url) values ('Pulseira Toronto Raptors', 'Pulseira de silicone oficial dos Raptors', 19.90, 6, 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m0bxuyjr7djxe8');
insert into tb_product (name, description, price, category_id, image_url) values ('Calça Cleveland Cavaliers', 'Calça de treino oficial dos Cavs', 169.90, 4, 'https://i.ebayimg.com/thumbs/images/g/wW0AAOSw4JZnWh5Y/s-l1200.jpg');

-- Usuários
INSERT INTO tb_user(display_name, username, password) VALUES ('Administrador', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO tb_user(display_name, username, password) VALUES ('Teste', 'test','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');'$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');

