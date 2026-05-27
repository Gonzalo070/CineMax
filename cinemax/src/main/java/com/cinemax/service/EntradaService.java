package com.cinemax.service;

import com.cinemax.model.Entrada;
import java.util.List;
import java.util.Optional;

public interface EntradaService {
    List<Entrada> findAll();
    Optional<Entrada> findById(Long id);
    Entrada save(Entrada entity);
    void deleteById(Long id);
}
