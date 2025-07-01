package br.edu.utfpr.pb.pw44s.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentMethodDTO {
    private Long id;

    @NotNull(message = "O tipo de pagamento não pode ser nulo")
    @Size(min = 1, max = 50, message = "O tipo de pagamento deve ter entre 1 e 50 caracteres")
    private String type;

    @NotNull(message = "Os detalhes do pagamento não podem ser nulos")
    @Size(min = 1, max = 255, message = "Os detalhes do pagamento devem ter entre 1 e 255 caracteres")
    private String details;
}