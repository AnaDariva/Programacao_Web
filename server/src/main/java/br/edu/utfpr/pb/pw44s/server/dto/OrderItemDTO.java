package br.edu.utfpr.pb.pw44s.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDTO {

    private Long id;
    private Integer quantity;
    private BigDecimal price;
    private Long productId;

    private String productName;
    private String productImageUrl;
}