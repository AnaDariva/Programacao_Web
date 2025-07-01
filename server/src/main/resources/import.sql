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

-- Produtos adicionais (Regatas/Jerseys)
insert into tb_product (name, description, price, category_id, image_url) values ('Regata Chicago Bulls Michael Jordan', 'Regata oficial Michael Jordan - Chicago Bulls', 549.90, 1, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ6rm2yZ44AKTQOXy_AMgUKZcFJMGCF66-HIeTcrgdSEzE7aNh3vWN34GNN2ixvysAdx-HRBM_66le2VmElmJzkb_8qcs4Wepafj3aCMtm4gbV1T7JdOs6DkA');
insert into tb_product (name, description, price, category_id, image_url) values ('Regata Boston Celtics Jayson Tatum', 'Regata oficial Jayson Tatum - Boston Celtics', 499.90, 1, 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRwdtTTwNyBstDuLXmldqa9V2tTKV-4DX4U_qQyJLIjNDqj6Bf75RtqFYJ2BaGXfrFZKv8eodPQZgZ0t_9qOkfj5W5eG18dkRJtXkuJIq7xwfLQ8YhT8vwp1w');
insert into tb_product (name, description, price, category_id, image_url) values ('Regata Brooklyn Nets Kevin Durant', 'Regata oficial Kevin Durant - Brooklyn Nets', 479.90, 1, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTtU2vFYyR81BPkqJSz57jxMhSABSRpN41WUXy12RTbKOoBkxixG670xJAIPoYP03mwKK9Ha3UW_grUPJ5C5e11nqmxmrnRWg4TyUg562Qt_1SXYeXhRVJm');
insert into tb_product (name, description, price, category_id, image_url) values ('Regata Dallas Mavericks Luka Doncic', 'Regata oficial Luka Doncic - Dallas Mavericks', 489.90, 1, 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQbCAa9BqnGJ1OeA6QeOfYrd9w-t9RM3UW2x1rFEEn0VQ22c00fOvV3LuBVRqyiH1W4eOc3GBjKQd7SkCH-_xnL2-l8nxALlzI3h8JmJneIatxWQk4KMHOZ');
insert into tb_product (name, description, price, category_id, image_url) values ('Regata Miami Heat Jimmy Butler', 'Regata oficial Jimmy Butler - Miami Heat', 499.90, 1, 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQFWYSmmGaJa_9QrcCw9vkZ4s0Uve6DLUA6hJzn3IbGTTiUxlyY05iHxWttXqx3UPl853uN6r-xH_q0HEBtc_s2uDsmu38');
insert into tb_product (name, description, price, category_id, image_url) values ('Regata Phoenix Suns Devin Booker', 'Regata oficial Devin Booker - Phoenix Suns', 489.90, 1, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTQkXZacBzKi7RCFCWNU_DE3MWZs8qpX3-LUqdmJ7IzPhoPkE9sDSUx3wrfn3BYXZxfmWQa314HFjeWasZyniLC33fAov73ll6tME1ohOrvLvxgn9atFKz9');
insert into tb_product (name, description, price, category_id, image_url) values ('Regata Milwaukee Bucks Giannis Antetokounmpo', 'Regata oficial Giannis Antetokounmpo - Milwaukee Bucks', 499.90, 1, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRtT4YVRgsTMYJFXeayNW_Kymxc-g5gmFc61W5CVIrloMmOOWVyCk1aIdvEkYkDUQbnC9pYIpul3AlzZQ6ShWYf4LJMuwhkcVpaggjhXLrySkr3pnZJxh6VdQ');
insert into tb_product (name, description, price, category_id, image_url) values ('Regata Houston Rockets James Harden', 'Regata oficial James Harden - Houston Rockets', 399.90, 1, 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSO9Kqr-ZsfvWSY9m-6LbK_cGvANix4-iHdvIJ24Wqhp7cohJYVdNbAyjNvdwwEn-5Lg_82QNqr3z8DuAjCbw_tqH8f5a99kOqkDyTN4wxfh5Syc85NSGxnTA');

-- Moletons
insert into tb_product (name, description, price, category_id, image_url) values ('Moletom Golden State Warriors', 'Moletom azul oficial dos Warriors', 279.90, 2, 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQd8T6ytAbO5eBM9iujP4WQCMX2oiKuDVcdZq-tpot4b8DJOM_LapjiBODqNEdXLW7nRxVQ9Ev95mDz8TszKoPNfwU97CQikyqxng6LaNjSocT5zXvi-9-2NQ');
insert into tb_product (name, description, price, category_id, image_url) values ('Moletom Chicago Bulls', 'Moletom vermelho oficial dos Bulls', 279.90, 2, 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQcf0desTHzitIT-uZIhcNAuGDlW-6tbIDRszdZEwM99osDDCS_hMil-djEXmrwhJ-mkdDahBg9XSynJ1H5CdAHDDPh55pzgvWOqEx55hBV_6WHIx5Qv1b5-A');

-- Camisetas
insert into tb_product (name, description, price, category_id, image_url) values ('Camiseta Los Angeles Lakers', 'Camiseta casual amarela com logo dos Lakers', 99.90, 3, 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTV_JEqHi4toHjrLyMB7bzvl1s9v2BINCzw_ESze0eLp2vDrC3QHWHgJgPf9MZr-V5xmyo9AwRbcLrwT7tYw894VSMSMengcq5LltNBuz9x9anuGNl7UgCR');
insert into tb_product (name, description, price, category_id, image_url) values ('Camiseta Boston Celtics', 'Camiseta casual verde com logo dos Celtics', 109.90, 3, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT141_yit-spgpKULbi44rFFviBVLs2ko2nrc-2KlleNFa3rktwHhMqPGW9L9-dSjdRkYBCljN8ueJ9tjiibJYFpQ5ix3bJVxAKNPl-352ggdLmExPoxKA1');

-- Calças e Shorts
insert into tb_product (name, description, price, category_id, image_url) values ('Shorts Lakers', 'Shorts de treino oficial dos Lakers', 139.90, 4, 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSAhmzT4Gtcc3JHq2KMCiYAK0WsJVBwZfRzjJdVvd_dlg26El6gb_B7LuWOdv6U1fe0jTXvEQYRqnfm2csAJPP8sOjK1mDh8RRHKdX2V6egIZtuomTe15ZDpTHI');

-- Bonés
insert into tb_product (name, description, price, category_id, image_url) values ('Boné Los Angeles Lakers', 'Boné com logo bordado dos Lakers', 99.90, 5, 'https://projetoinfluencer.vteximg.com.br/arquivos/ids/7023653-640-960/Bone-Mitchell---Ness-NBA-Against-The-Best-Pro-Snapback-Los-Angeles-Lakers-Preto.jpg?v=638821762850230000');

-- Acessórios
insert into tb_product (name, description, price, category_id, image_url) values ('Meia NBA Oficial', 'Meia oficial da NBA, branca', 29.90, 6, 'https://acdn-us.mitiendanube.com/stores/001/969/448/products/29503e33f98c0fdbeced3f5a9c2d3014-c18be6d8064793f87217411978990369-480-0.png');

-- Usuários
INSERT INTO tb_user(display_name, username, password) VALUES ('Administrador', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO tb_user(display_name, username, password) VALUES ('Teste', 'test','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');

/*-- Categorias (Tipos de produto)
INSERT INTO TB_CATEGORY (NAME) VALUES ('Regatas');
INSERT INTO TB_CATEGORY (NAME) VALUES ('Moletons');
INSERT INTO TB_CATEGORY (NAME) VALUES ('Camisetas');
INSERT INTO TB_CATEGORY (NAME) VALUES ('Calças e Shorts');
INSERT INTO TB_CATEGORY (NAME) VALUES ('Bonés');
INSERT INTO TB_CATEGORY (NAME) VALUES ('Acessórios');*/

/*-- Regatas
INSERT INTO TB_PRODUCT (NAME, SHORT_DESCRIPTION, DESCRIPTION, PRICE, CATEGORY_ID, IMAGE_URL) VALUES
                                                                                                 ('Regata Lakers LeBron James',
                                                                                                  'Regata oficial do LeBron James - Los Angeles Lakers',
                                                                                                  'Esta regata Swingman dos Lakers é feita em tecido premium, com nome e número bordados do LeBron James. Produto oficial da NBA para colecionadores e fãs.',
                                                                                                  499.90, 1,
                                                                                                  'https://acdn-us.mitiendanube.com/stores/001/986/628/products/camiseta-los-angeles-lakers-lebron-james-jordan-swingman-roxo-11-d55f8deff31cd88d4616438476414223-640-0.jpg'),

                                                                                                 ('Regata Golden State Curry',
                                                                                                  'Regata oficial do Stephen Curry - Golden State Warriors',
                                                                                                  'Vista-se como o MVP! Regata oficial dos Warriors com acabamento profissional, confortável e resistente. Produto licenciado NBA.',
                                                                                                  499.90, 1,
                                                                                                  'https://acdn-us.mitiendanube.com/stores/001/226/115/products/regata-nba-nike-swingman-golden-state-warriors-branca-curry-301-0bd1a035f1fb21fdad15913954396439-640-0.jpg'),

                                                                                                 ('Regata Chicago Bulls Michael Jordan',
                                                                                                  'Regata oficial Michael Jordan - Chicago Bulls',
                                                                                                  'A clássica camisa dos Bulls usada por Michael Jordan, ícone do basquete mundial. Material premium, detalhes bordados, para fãs e colecionadores.',
                                                                                                  549.90, 1,
                                                                                                  'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ6rm2yZ44AKTQOXy_AMgUKZcFJMGCF66-HIeTcrgdSEzE7aNh3vWN34GNN2ixvysAdx-HRBM_66le2VmElmJzkb_8qcs4Wepafj3aCMtm4gbV1T7JdOs6DkA'),

                                                                                                 ('Regata Boston Celtics Jayson Tatum',
                                                                                                  'Regata oficial Jayson Tatum - Boston Celtics',
                                                                                                  'Jersey do Celtics com nome e número do Jayson Tatum. Produto licenciado, perfeito para torcer e colecionar.',
                                                                                                  499.90, 1,
                                                                                                  'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRwdtTTwNyBstDuLXmldqa9V2tTKV-4DX4U_qQyJLIjNDqj6Bf75RtqFYJ2BaGXfrFZKv8eodPQZgZ0t_9qOkfj5W5eG18dkRJtXkuJIq7xwfLQ8YhT8vwp1w'),

                                                                                                 ('Regata Brooklyn Nets Kevin Durant',
                                                                                                  'Regata oficial Kevin Durant - Brooklyn Nets',
                                                                                                  'Uniforme dos Nets com detalhes em tecido tecnológico, nome e número de Kevin Durant. Ideal para jogos e dia a dia.',
                                                                                                  479.90, 1,
                                                                                                  'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTtU2vFYyR81BPkqJSz57jxMhSABSRpN41WUXy12RTbKOoBkxixG670xJAIPoYP03mwKK9Ha3UW_grUPJ5C5e11nqmxmrnRWg4TyUg562Qt_1SXYeXhRVJm'),

                                                                                                 ('Regata Dallas Mavericks Luka Doncic',
                                                                                                  'Regata oficial Luka Doncic - Dallas Mavericks',
                                                                                                  'Mostre seu apoio ao Dallas com esta regata do Luka Doncic. Conforto e estilo no produto licenciado NBA.',
                                                                                                  489.90, 1,
                                                                                                  'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQbCAa9BqnGJ1OeA6QeOfYrd9w-t9RM3UW2x1rFEEn0VQ22c00fOvV3LuBVRqyiH1W4eOc3GBjKQd7SkCH-_xnL2-l8nxALlzI3h8JmJneIatxWQk4KMHOZ'),

                                                                                                 ('Regata Miami Heat Jimmy Butler',
                                                                                                  'Regata oficial Jimmy Butler - Miami Heat',
                                                                                                  'A jersey do Heat de Jimmy Butler, perfeita para fãs. Material resistente, detalhes oficiais.',
                                                                                                  499.90, 1,
                                                                                                  'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQFWYSmmGaJa_9QrcCw9vkZ4s0Uve6DLUA6hJzn3IbGTTiUxlyY05iHxWttXqx3UPl853uN6r-xH_q0HEBtc_s2uDsmu38'),

                                                                                                 ('Regata Phoenix Suns Devin Booker',
                                                                                                  'Regata oficial Devin Booker - Phoenix Suns',
                                                                                                  'Viva o clima do Arizona! Jersey do Booker em tecido leve, perfeito para partidas e colecionadores.',
                                                                                                  489.90, 1,
                                                                                                  'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTQkXZacBzKi7RCFCWNU_DE3MWZs8qpX3-LUqdmJ7IzPhoPkE9sDSUx3wrfn3BYXZxfmWQa314HFjeWasZyniLC33fAov73ll6tME1ohOrvLvxgn9atFKz9'),

                                                                                                 ('Regata Milwaukee Bucks Giannis Antetokounmpo',
                                                                                                  'Regata oficial Giannis Antetokounmpo - Milwaukee Bucks',
                                                                                                  'A jersey dos Bucks com o grego voador, Antetokounmpo. Oficial, tecido resistente, super estilosa!',
                                                                                                  499.90, 1,
                                                                                                  'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRtT4YVRgsTMYJFXeayNW_Kymxc-g5gmFc61W5CVIrloMmOOWVyCk1aIdvEkYkDUQbnC9pYIpul3AlzZQ6ShWYf4LJMuwhkcVpaggjhXLrySkr3pnZJxh6VdQ'),

                                                                                                 ('Regata Houston Rockets James Harden',
                                                                                                  'Regata oficial James Harden - Houston Rockets',
                                                                                                  'Mostre seu apoio ao Barba! Jersey oficial dos Rockets com nome e número bordados.',
                                                                                                  399.90, 1,
                                                                                                  'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSO9Kqr-ZsfvWSY9m-6LbK_cGvANix4-iHdvIJ24Wqhp7cohJYVdNbAyjNvdwwEn-5Lg_82QNqr3z8DuAjCbw_tqH8f5a99kOqkDyTN4wxfh5Syc85NSGxnTA');

-- Moletons
INSERT INTO TB_PRODUCT (NAME, SHORT_DESCRIPTION, DESCRIPTION, PRICE, CATEGORY_ID, IMAGE_URL) VALUES
                                                                                                 ('Moletom Boston Celtics',
                                                                                                  'Moletom verde oficial do Boston Celtics',
                                                                                                  'Moletom confortável, oficial dos Celtics, com capuz e bolsos frontais. Produto licenciado NBA.',
                                                                                                  279.90, 2,
                                                                                                  'https://cdn.awsli.com.br/2500x2500/59/59657/produto/57875474/610b01c669.jpg'),

                                                                                                 ('Moletom Golden State Warriors',
                                                                                                  'Moletom azul oficial dos Warriors',
                                                                                                  'Produto oficial dos Warriors, super confortável e estiloso para o frio.',
                                                                                                  279.90, 2,
                                                                                                  'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQd8T6ytAbO5eBM9iujP4WQCMX2oiKuDVcdZq-tpot4b8DJOM_LapjiBODqNEdXLW7nRxVQ9Ev95mDz8TszKoPNfwU97CQikyqxng6LaNjSocT5zXvi-9-2NQ'),

                                                                                                 ('Moletom Chicago Bulls',
                                                                                                  'Moletom vermelho oficial dos Bulls',
                                                                                                  'Estilo e conforto no moletom oficial dos Bulls. Para usar no frio e mostrar seu time.',
                                                                                                  279.90, 2,
                                                                                                  'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQcf0desTHzitIT-uZIhcNAuGDlW-6tbIDRszdZEwM99osDDCS_hMil-djEXmrwhJ-mkdDahBg9XSynJ1H5CdAHDDPh55pzgvWOqEx55hBV_6WHIx5Qv1b5-A');

-- Camisetas
INSERT INTO TB_PRODUCT (NAME, SHORT_DESCRIPTION, DESCRIPTION, PRICE, CATEGORY_ID, IMAGE_URL) VALUES
                                                                                                 ('Camiseta Chicago Bulls',
                                                                                                  'Camiseta casual preta com logo dos Bulls',
                                                                                                  'Camiseta em algodão, com logo dos Bulls estampado. Ideal para o dia a dia ou para torcer.',
                                                                                                  119.90, 3,
                                                                                                  'https://images.tcdn.com.br/img/img_prod/710966/camiseta_new_era_nba_chicago_bulls_basic_time_preta_1535_1_a0c07e05c981ca7301a90a4abf0143aa_20210714094603.jpg'),

                                                                                                 ('Camiseta Los Angeles Lakers',
                                                                                                  'Camiseta casual amarela com logo dos Lakers',
                                                                                                  'Camiseta confortável com estampa dos Lakers, ótima para o dia a dia.',
                                                                                                  99.90, 3,
                                                                                                  'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTV_JEqHi4toHjrLyMB7bzvl1s9v2BINCzw_ESze0eLp2vDrC3QHWHgJgPf9MZr-V5xmyo9AwRbcLrwT7tYw894VSMSMengcq5LltNBuz9x9anuGNl7UgCR'),

                                                                                                 ('Camiseta Boston Celtics',
                                                                                                  'Camiseta casual verde com logo dos Celtics',
                                                                                                  'Camiseta em algodão, confortável, com a tradicional cor verde dos Celtics.',
                                                                                                  109.90, 3,
                                                                                                  'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT141_yit-spgpKULbi44rFFviBVLs2ko2nrc-2KlleNFa3rktwHhMqPGW9L9-dSjdRkYBCljN8ueJ9tjiibJYFpQ5ix3bJVxAKNPl-352ggdLmExPoxKA1');

-- Calças e Shorts
INSERT INTO TB_PRODUCT (NAME, SHORT_DESCRIPTION, DESCRIPTION, PRICE, CATEGORY_ID, IMAGE_URL) VALUES
                                                                                                 ('Shorts Miami Heat',
                                                                                                  'Shorts oficiais de jogo do Miami Heat',
                                                                                                  'Shorts licenciado do Miami Heat, ideal para jogos ou treinos, super confortável e leve.',
                                                                                                  149.90, 4,
                                                                                                  'https://acdn-us.mitiendanube.com/stores/001/055/309/products/miami-heat-icon-edition-short-preto-vermelho-amarelo-escuro-nike-basquete-nba-bermuda-jersey-oficial-original-licenciada-qualidade-masculina-confiavel-loja-51-2bb07733c5777187b316923017531240-1024-1024.jpg'),

                                                                                                 ('Shorts Lakers',
                                                                                                  'Shorts de treino oficial dos Lakers',
                                                                                                  'Shorts roxo com detalhes dourados, produto licenciado dos Lakers.',
                                                                                                  139.90, 4,
                                                                                                  'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSAhmzT4Gtcc3JHq2KMCiYAK0WsJVBwZfRzjJdVvd_dlg26El6gb_B7LuWOdv6U1fe0jTXvEQYRqnfm2csAJPP8sOjK1mDh8RRHKdX2V6egIZtuomTe15ZDpTHI'),

                                                                                                 ('Calça Cleveland Cavaliers',
                                                                                                  'Calça de treino oficial dos Cavs',
                                                                                                  'Calça oficial do Cleveland Cavaliers, ideal para praticar esportes e se aquecer no inverno.',
                                                                                                  169.90, 4,
                                                                                                  'https://i.ebayimg.com/thumbs/images/g/wW0AAOSw4JZnWh5Y/s-l1200.jpg');

-- Bonés
INSERT INTO TB_PRODUCT (NAME, SHORT_DESCRIPTION, DESCRIPTION, PRICE, CATEGORY_ID, IMAGE_URL) VALUES
                                                                                                 ('Boné Milwaukee Bucks',
                                                                                                  'Boné com logo bordado dos Bucks',
                                                                                                  'Boné oficial do Milwaukee Bucks, confortável e estiloso para o dia a dia.',
                                                                                                  99.90, 5,
                                                                                                  'https://static.prospin.com.br/media/catalog/product/cache/6e59e4946046b080cb91aa3230980e44/n/b/nbv18bon406-bone-new-era-9forty-nba-milwaukee-bucks.jpg'),

                                                                                                 ('Boné Los Angeles Lakers',
                                                                                                  'Boné com logo bordado dos Lakers',
                                                                                                  'Boné roxo e dourado dos Lakers, produto oficial da NBA, para completar seu visual.',
                                                                                                  99.90, 5,
                                                                                                  'https://projetoinfluencer.vteximg.com.br/arquivos/ids/7023653-640-960/Bone-Mitchell---Ness-NBA-Against-The-Best-Pro-Snapback-Los-Angeles-Lakers-Preto.jpg?v=638821762850230000');

-- Acessórios
INSERT INTO TB_PRODUCT (NAME, SHORT_DESCRIPTION, DESCRIPTION, PRICE, CATEGORY_ID, IMAGE_URL) VALUES
                                                                                                 ('Chaveiro Dallas Mavericks',
                                                                                                  'Chaveiro oficial dos Mavericks em metal',
                                                                                                  'Chaveiro em metal, resistente, com escudo do Dallas Mavericks. Perfeito para colecionadores.',
                                                                                                  29.90, 6,
                                                                                                  'https://m.media-amazon.com/images/I/81Yb-ueWAxL._AC_UF1000,1000_QL80_.jpg'),

                                                                                                 ('Pulseira Toronto Raptors',
                                                                                                  'Pulseira de silicone oficial dos Raptors',
                                                                                                  'Pulseira estilosa, resistente à água, nas cores dos Raptors. Ideal para presentear e colecionar.',
                                                                                                  19.90, 6,
                                                                                                  'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m0bxuyjr7djxe8'),

                                                                                                 ('Meia NBA Oficial',
                                                                                                  'Meia oficial da NBA, branca',
                                                                                                  'Meia branca confortável, com logo oficial da NBA. Perfeita para treinos, jogos ou dia a dia.',
                                                                                                  29.90, 6,
                                                                                                  'https://acdn-us.mitiendanube.com/stores/001/969/448/products/29503e33f98c0fdbeced3f5a9c2d3014-c18be6d8064793f87217411978990369-480-0.png');
*/