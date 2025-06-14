package br.edu.utfpr.pb.pw44s.server.service;

import br.edu.utfpr.pb.pw44s.server.model.Product;
import java.util.List; // Adicionar este import

public interface IProductService extends ICrudService<Product, Long> {
    // NOVO MÉTODO: Assinatura para buscar produtos por ID de categoria
    List<Product> findByCategoryId(Long categoryId);
}