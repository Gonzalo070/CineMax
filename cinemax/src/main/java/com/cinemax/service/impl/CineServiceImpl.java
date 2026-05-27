package com.cinemax.service.impl;

import com.cinemax.model.Cine;
import com.cinemax.repository.CineRepository;
import com.cinemax.service.CineService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CineServiceImpl implements CineService {

    private final CineRepository cineRepository;

    @Override
    public List<Cine> findAll() {
        return cineRepository.findAll();
    }

    @Override
    public Optional<Cine> findById(Long id) {
        return cineRepository.findById(id);
    }

    @Override
    public List<Cine> findByNombre(String nombre) {
        return cineRepository.findByNombreContainingIgnoreCase(nombre);
    }

    @Override
    public Cine save(Cine cine) {
        return cineRepository.save(cine);
    }

    @Override
    public Cine update(Long id, Cine cineActualizado) {
        return cineRepository.findById(id).map(cineExistente -> {
            cineExistente.setNombre(cineActualizado.getNombre());
            cineExistente.setDireccion(cineActualizado.getDireccion());
            return cineRepository.save(cineExistente);
        }).orElseThrow(() -> new RuntimeException("Cine no encontrado con id: " + id));
    }

    @Override
    public void deleteById(Long id) {
        if (!cineRepository.existsById(id)) {
            throw new RuntimeException("Cine no encontrado con id: " + id);
        }
        cineRepository.deleteById(id);
    }
}
