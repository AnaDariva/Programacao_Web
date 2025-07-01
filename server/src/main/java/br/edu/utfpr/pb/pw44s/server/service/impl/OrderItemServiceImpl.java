package br.edu.utfpr.pb.pw44s.server.service.impl;

import br.edu.utfpr.pb.pw44s.server.model.OrderItem;
import br.edu.utfpr.pb.pw44s.server.repository.OrderItemRepository;
import br.edu.utfpr.pb.pw44s.server.service.IOrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemServiceImpl implements IOrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;


    @Override
    public List<OrderItem> findAll() {
        return orderItemRepository.findAll();
    }

    @Override
    public List<OrderItem> findAll(Sort sort) {
        return orderItemRepository.findAll(sort);
    }

    @Override
    public Page<OrderItem> findAll(Pageable pageable) {
        return orderItemRepository.findAll(pageable);
    }

    @Override
    public Optional<OrderItem> findById(Long id) {
        return orderItemRepository.findById(id);
    }

    @Override
    public OrderItem save(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @Override
    public OrderItem saveAndFlush(OrderItem orderItem) {
        return orderItemRepository.saveAndFlush(orderItem);
    }

    @Override
    public Iterable<OrderItem> save(Iterable<OrderItem> orderItems) {
        return orderItemRepository.saveAll(orderItems);
    }

    @Override
    public void flush() {
        orderItemRepository.flush();
    }

    @Override
    public boolean exists(Long id) {
        return orderItemRepository.existsById(id);
    }

    @Override
    public long count() {
        return orderItemRepository.count();
    }

    @Override
    public void delete(Long id) {
        orderItemRepository.deleteById(id);
    }

    @Override
    public void delete(Iterable<? extends OrderItem> orderItems) {
        orderItemRepository.deleteAll(orderItems);
    }

    @Override
    public void deleteAll() {
        orderItemRepository.deleteAll();
    }

    @Override
    public List<OrderItem> findByOrderId(Long orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }
}
