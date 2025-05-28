package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.model.Category;
import br.edu.utfpr.pb.pw44s.server.service.ICategoryService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("categories")
public class CategoryController {

    private final ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<Category> save(@RequestBody @Valid Category category) {
        categoryService.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(category);
    }

    @PutMapping
    public ResponseEntity<Category> update(@RequestBody @Valid Category category) {
        categoryService.save(category);
        return ResponseEntity.status(HttpStatus.OK).body(category);
    }

    @GetMapping
    public ResponseEntity<List<Category>> findAll() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categoryService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<Category> findById(@PathVariable Long id) {
        return categoryService.findById(id)
                .map(category -> ResponseEntity.status(HttpStatus.OK).body(category))
                .orElse(ResponseEntity.noContent().build());
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<String> delete(@PathVariable Long id) {
        Optional<Category> categoryOptional = categoryService.findById(id); // Recebe um Optional
        if (categoryOptional.isPresent()) {
            categoryService.delete(id);  // Passa o id para o delete
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Categoria deletada com sucesso.");
        } else {
            // Se a categoria não for encontrada, retornamos um erro 404
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Categoria não encontrada para o id: " + id);
        }
    }

    @GetMapping("count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.count());
    }

    @GetMapping("exists/{id}")
    public ResponseEntity<Boolean> exists(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.exists(id));
    }

    @GetMapping("page")
    public ResponseEntity<Page<Category>> findPage(@RequestParam int page,
                                                   @RequestParam int size,
                                                   @RequestParam(required = false) String order,
                                                   @RequestParam(required = false) Boolean asc) {
        PageRequest pageRequest = PageRequest.of(page, size);
        if (order != null && asc != null) {
            pageRequest = PageRequest.of(page, size,
                    asc ? Sort.Direction.ASC : Sort.Direction.DESC, order);
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(categoryService.findAll(pageRequest));
    }
}
