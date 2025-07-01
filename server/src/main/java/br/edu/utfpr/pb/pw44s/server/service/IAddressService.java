package br.edu.utfpr.pb.pw44s.server.service;

import br.edu.utfpr.pb.pw44s.server.model.Address;
import br.edu.utfpr.pb.pw44s.server.model.User;

import java.util.List;

public interface IAddressService {
    List<Address> getAddressesForCurrentUser(User user);
    Address save(Address address);
    void delete(Long id);
}
