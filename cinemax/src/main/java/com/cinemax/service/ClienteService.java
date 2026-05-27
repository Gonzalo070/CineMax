package com.cinemax.service;

import com.cinemax.model.Cliente;
import java.util.List;
import java.util.Optional;

public interface ClienteService {
    List<Cliente> findAll();
    Optional<Cliente> findById(Long id);
    Cliente save(Cliente entity);
    void deleteById(Long id);
}
