package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.ShippingRequestDTO;
import br.edu.utfpr.pb.pw44s.server.dto.ShippingResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shipping")
public class ShippingController {

    @PostMapping("/calculate")
    public ResponseEntity<ShippingResponseDTO> calculateShipping(@RequestBody ShippingRequestDTO request) {
        String zipCode = request.getZipCode();

        double shippingCost;

        if (zipCode != null && zipCode.startsWith("8")) {
            shippingCost = 10.0;
        } else {
            shippingCost = 20.0;
        }

        return ResponseEntity.ok(new ShippingResponseDTO(shippingCost));
    }
}
