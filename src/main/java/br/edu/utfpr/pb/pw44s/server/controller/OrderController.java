package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.service.IOrderService;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final IOrderService orderService;

    public OrderController(IOrderService orderService) {
        this.orderService = orderService;
    }

    //criar um novo pedido
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Order createOrder(@Valid @RequestBody Order order) {
        return orderService.save(order);
    }

    //listar todos os pedidos
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.findAll();
    }

    //buscar pedido por ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderService.findById(id);
        return order.orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
    }

    //deletar um pedido por ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable Long id) {
        orderService.delete(id);
    }

    //adicionar mais endpoints, como atualizar pedidos, mais pra frente no trab.
}
