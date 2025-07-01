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
public class AddressDTO {
    private Long id;

    @NotNull(message = "A rua não pode ser nula")
    @Size(min = 1, max = 255, message = "A rua deve ter entre 1 e 255 caracteres")
    private String street;

    @NotNull(message = "O número não pode ser nulo")
    @Size(min = 1, max = 255, message = "O número deve ter entre 1 e 255 caracteres")
    private String number;

    private String complement;

    @NotNull(message = "O bairro não pode ser nulo")
    @Size(min = 1, max = 255, message = "O bairro deve ter entre 1 e 255 caracteres")
    private String neighborhood;

    @NotNull(message = "A cidade não pode ser nula")
    @Size(min = 1, max = 255, message = "A cidade deve ter entre 1 e 255 caracteres")
    private String city;

    @NotNull(message = "O estado não pode ser nulo")
    @Size(min = 2, max = 2, message = "O estado deve ter 2 caracteres (UF)")
    private String state;

    @NotNull(message = "O CEP não pode ser nulo")
    @Size(min = 8, max = 9, message = "O CEP deve ter 8 ou 9 caracteres (Ex: 00000-000)")
    private String zipCode;
}