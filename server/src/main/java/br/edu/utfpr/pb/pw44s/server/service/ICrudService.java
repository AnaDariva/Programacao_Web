package br.edu.utfpr.pb.pw44s.server.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public interface ICrudService<T, ID extends Serializable> {

    List<T> findAll();

    List<T> findAll(Sort sort);

    Page<T> findAll(Pageable pageable);

    Optional<T> findById(ID id);
    T save(T entity);

    T saveAndFlush(T entity);

    Iterable<T> save(Iterable<T> iterable);

    void flush();


    boolean exists(ID id);

    long count();

    void delete(ID id);

    void delete(Iterable<? extends T> iterable);

    void deleteAll();
}
