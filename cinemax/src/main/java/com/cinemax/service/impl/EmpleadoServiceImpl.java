package com.cinemax.service.impl;

import com.cinemax.model.Empleado;
import com.cinemax.repository.EmpleadoRepository;
import com.cinemax.service.EmpleadoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmpleadoServiceImpl implements EmpleadoService {

    private final EmpleadoRepository repository;

    @Override
    public List<Empleado> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Empleado> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Empleado save(Empleado entity) {
        return repository.save(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
