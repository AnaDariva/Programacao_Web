package br.edu.utfpr.pb.pw44s.server.dto;

import lombok.Data;

@Data
public class AddressDTO {
    private String street;
    private String complement;
    private String zipCode;
    private String city;
    private String state;
}
