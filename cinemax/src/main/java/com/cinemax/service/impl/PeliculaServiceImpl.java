package com.cinemax.service.impl;

import com.cinemax.model.Pelicula;
import com.cinemax.model.enums.Genero;
import com.cinemax.repository.PeliculaRepository;
import com.cinemax.service.PeliculaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PeliculaServiceImpl implements PeliculaService {

    private final PeliculaRepository peliculaRepository;

    @Override
    public List<Pelicula> findAll() {
        return peliculaRepository.findAll();
    }

    @Override
    public Optional<Pelicula> findById(Long id) {
        return peliculaRepository.findById(id);
    }

    @Override
    public List<Pelicula> findByGenero(Genero genero) {
        return peliculaRepository.findByGenero(genero);
    }

    @Override
    public List<Pelicula> findByTitulo(String titulo) {
        return peliculaRepository.findByTituloContainingIgnoreCase(titulo);
    }

    @Override
    public Pelicula save(Pelicula pelicula) {
        return peliculaRepository.save(pelicula);
    }

    @Override
    public Pelicula update(Long id, Pelicula peliculaActualizada) {
        return peliculaRepository.findById(id).map(peliculaExistente -> {
            peliculaExistente.setTitulo(peliculaActualizada.getTitulo());
            peliculaExistente.setGenero(peliculaActualizada.getGenero());
            return peliculaRepository.save(peliculaExistente);
        }).orElseThrow(() -> new RuntimeException("Pelicula no encontrada con id: " + id));
    }

    @Override
    public void deleteById(Long id) {
        if (!peliculaRepository.existsById(id)) {
            throw new RuntimeException("Pelicula no encontrada con id: " + id);
        }
        peliculaRepository.deleteById(id);
    }
}
