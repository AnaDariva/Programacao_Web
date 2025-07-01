package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.OrderDTO;
import br.edu.utfpr.pb.pw44s.server.model.Order;
import br.edu.utfpr.pb.pw44s.server.service.IOrderService;
import br.edu.utfpr.pb.pw44s.server.service.AuthService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
public class OrderController extends CrudController<Order, OrderDTO, Long> {

    private final IOrderService orderService;
    private final ModelMapper modelMapper;
    private final AuthService authService;

    public OrderController(IOrderService orderService, ModelMapper modelMapper, AuthService authService) {
        super(Order.class, OrderDTO.class);
        this.orderService = orderService;
        this.modelMapper = modelMapper;
        this.authService = authService;
    }

    @Override
    protected IOrderService getService() {
        return this.orderService;
    }

    @Override
    public ModelMapper getModelMapper() {
        return modelMapper;
    }


    @Override
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<OrderDTO> create(@RequestBody @Valid OrderDTO orderDTO) {

        Order order = modelMapper.map(orderDTO, Order.class);
        Order savedOrder = orderService.save(order);
        OrderDTO responseDTO = modelMapper.map(savedOrder, OrderDTO.class);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }


    @GetMapping("/my")
    public List<OrderDTO> getMyOrders() {
        Long userId = authService.getAuthenticatedUser().getId();
        List<Order> orders = orderService.findByUserId(userId);
        return orders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }

}