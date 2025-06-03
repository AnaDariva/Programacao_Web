package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.model.Address;
import br.edu.utfpr.pb.pw44s.server.service.IAddressService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
public class AddressController {

    private final IAddressService addressService;

    public AddressController(IAddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public Address save(@Valid @RequestBody Address address) {
        return addressService.save(address);
    }

    @GetMapping
    public List<Address> getCurrentUserAddresses() {
        return addressService.getAddressesForCurrentUser();
    }
}
