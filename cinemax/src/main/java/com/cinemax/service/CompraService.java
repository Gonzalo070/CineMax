package com.cinemax.service;

import com.cinemax.model.Compra;
import java.util.List;
import java.util.Optional;

public interface CompraService {
    List<Compra> findAll();
    Optional<Compra> findById(Long id);
    Compra save(Compra entity);
    void deleteById(Long id);
}
