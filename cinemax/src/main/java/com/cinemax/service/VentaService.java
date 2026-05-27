package com.cinemax.service;

import com.cinemax.model.Venta;
import java.util.List;
import java.util.Optional;

public interface VentaService {
    List<Venta> findAll();
    Optional<Venta> findById(Long id);
    Venta save(Venta entity);
    void deleteById(Long id);
}
