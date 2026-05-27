package com.cinemax.service;

import com.cinemax.model.Pago;
import java.util.List;
import java.util.Optional;

public interface PagoService {
    List<Pago> findAll();
    Optional<Pago> findById(Long id);
    Pago save(Pago entity);
    void deleteById(Long id);
}
