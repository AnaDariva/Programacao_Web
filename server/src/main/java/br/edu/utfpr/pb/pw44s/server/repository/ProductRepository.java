package br.edu.utfpr.pb.pw44s.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.edu.utfpr.pb.pw44s.server.model.Product;
import java.util.List; // Adicionar este import

public interface ProductRepository extends JpaRepository<Product, Long> {
    // NOVO MÉTODO: Spring Data JPA criará a implementação automaticamente
    List<Product> findByCategoryId(Long categoryId);
}