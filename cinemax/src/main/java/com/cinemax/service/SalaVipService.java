package com.cinemax.service;

import com.cinemax.model.SalaVip;
import java.util.List;
import java.util.Optional;

public interface SalaVipService {
    List<SalaVip> findAll();
    Optional<SalaVip> findById(Long id);
    SalaVip save(SalaVip entity);
    void deleteById(Long id);
}
