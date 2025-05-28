package br.edu.utfpr.pb.pw44s.server.service.impl;

import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.model.OrderItem;
import br.edu.utfpr.pb.pw44s.server.model.User;
import br.edu.utfpr.pb.pw44s.server.repository.OrderRepository;
import br.edu.utfpr.pb.pw44s.server.service.AuthService;
import br.edu.utfpr.pb.pw44s.server.service.IOrderService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Service
public class OrderServiceImpl extends CrudServiceImpl<Order, Long> implements IOrderService {

    private final OrderRepository orderRepository;
    private final AuthService authService;

    public OrderServiceImpl(OrderRepository orderRepository, AuthService authService) {
        this.orderRepository = orderRepository;
        this.authService = authService;
    }

    @Override
    protected OrderRepository getRepository() {
        return orderRepository;
    }

    @Override
    public Order save(Order order) {
        // Define o usuário autenticado como dono do pedido
        User user = authService.getAuthenticatedUser();
        order.setUser(user);

        // Define a data/hora do pedido
        order.setOrderDate(LocalDateTime.now());

        // Calcula o total somando unitPrice * quantity de cada item
        BigDecimal total = BigDecimal.ZERO;
        for (OrderItem item : order.getItems()) {
            BigDecimal quantity = BigDecimal.valueOf(item.getQuantity());
            BigDecimal itemTotal = item.getUnitPrice().multiply(quantity);
            total = total.add(itemTotal);
            // Também relaciona o item com o pedido
            item.setOrder(order);
        }
        order.setTotal(total.setScale(2, RoundingMode.HALF_UP));

        return orderRepository.save(order);
    }
}
