package com.cinemax.service;

import com.cinemax.model.Insumo;
import java.util.List;
import java.util.Optional;

public interface InsumoService {
    List<Insumo> findAll();
    Optional<Insumo> findById(Long id);
    Insumo save(Insumo entity);
    void deleteById(Long id);
}
