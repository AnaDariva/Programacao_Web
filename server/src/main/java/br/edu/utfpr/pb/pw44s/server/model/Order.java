package br.edu.utfpr.pb.pw44s.server.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tb_order")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @Column(nullable = false)
    private BigDecimal totalAmount;

    @Column(nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items;

    @Column(nullable = false)
    private String shippingAddressStreet;
    @Column(nullable = false)
    private String shippingAddressNumber;
    private String shippingAddressComplement;
    @Column(nullable = false)
    private String shippingAddressNeighborhood;
    @Column(nullable = false)
    private String shippingAddressCity;
    @Column(nullable = false)
    private String shippingAddressState;
    @Column(nullable = false)
    private String shippingAddressZipCode;

    @Column(nullable = false)
    private String paymentMethodType;
    @Column(nullable = false)
    private String paymentMethodDetails;

    @PrePersist
    protected void onCreate() {
        if (this.orderDate == null) {
            this.orderDate = LocalDateTime.now();
        }
        if (this.status == null || this.status.isEmpty()) {
            this.status = "PENDING";
        }
        if (this.shippingAddressStreet == null) this.shippingAddressStreet = "";
        if (this.shippingAddressNumber == null) this.shippingAddressNumber = "";
        if (this.shippingAddressNeighborhood == null) this.shippingAddressNeighborhood = "";
        if (this.shippingAddressCity == null) this.shippingAddressCity = "";
        if (this.shippingAddressState == null) this.shippingAddressState = "";
        if (this.shippingAddressZipCode == null) this.shippingAddressZipCode = "";
        if (this.paymentMethodType == null) this.paymentMethodType = "";
        if (this.paymentMethodDetails == null) this.paymentMethodDetails = "";
    }
}