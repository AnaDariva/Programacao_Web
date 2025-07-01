package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.AddressDTO;
import br.edu.utfpr.pb.pw44s.server.dto.AddressResponseDTO;
import br.edu.utfpr.pb.pw44s.server.model.Address;
import br.edu.utfpr.pb.pw44s.server.model.User;
import br.edu.utfpr.pb.pw44s.server.security.JwtTokenUtil;
import br.edu.utfpr.pb.pw44s.server.service.IAddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final IAddressService addressService;
    private final JwtTokenUtil jwtTokenUtil;
    private final ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<AddressResponseDTO> save(@Valid @RequestBody AddressDTO addressDTO) {
        User user = jwtTokenUtil.getAuthenticatedUser();

        Address address = modelMapper.map(addressDTO, Address.class);
        address.setUser(user);

        Address savedAddress = addressService.save(address);
        AddressResponseDTO responseDTO = modelMapper.map(savedAddress, AddressResponseDTO.class);

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping
    public ResponseEntity<List<AddressResponseDTO>> getCurrentUserAddresses() {
        User user = jwtTokenUtil.getAuthenticatedUser();

        List<Address> addresses = addressService.getAddressesForCurrentUser(user);

        List<AddressResponseDTO> responseDTOs = addresses.stream()
                .map(address -> modelMapper.map(address, AddressResponseDTO.class))
                .toList();

        return ResponseEntity.ok(responseDTOs);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        addressService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
