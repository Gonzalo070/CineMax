package com.cinemax.service;

import com.cinemax.model.ClienteVip;
import java.util.List;
import java.util.Optional;

public interface ClienteVipService {
    List<ClienteVip> findAll();
    Optional<ClienteVip> findById(Long id);
    ClienteVip save(ClienteVip entity);
    void deleteById(Long id);
}
