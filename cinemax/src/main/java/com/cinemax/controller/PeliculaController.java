package com.cinemax.controller;

import com.cinemax.model.Pelicula;
import com.cinemax.model.enums.Genero;
import com.cinemax.service.PeliculaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Endpoint base: /api/peliculas
 *
 * GET    /api/peliculas              → listar todas
 * GET    /api/peliculas/{id}         → buscar por id
 * GET    /api/peliculas/genero/{g}   → filtrar por género
 * GET    /api/peliculas/buscar?titulo=X → buscar por título
 * POST   /api/peliculas              → crear
 * PUT    /api/peliculas/{id}         → actualizar
 * DELETE /api/peliculas/{id}         → eliminar
 */
@RestController
@RequestMapping("/api/peliculas")
@RequiredArgsConstructor
public class PeliculaController {

    private final PeliculaService peliculaService;

    // ---- GET ALL ----
    @GetMapping
    public ResponseEntity<List<Pelicula>> getAll() {
        return ResponseEntity.ok(peliculaService.findAll());
    }

    // ---- GET BY ID ----
    @GetMapping("/{id}")
    public ResponseEntity<Pelicula> getById(@PathVariable Long id) {
        return peliculaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ---- GET BY GENERO ----
    @GetMapping("/genero/{genero}")
    public ResponseEntity<List<Pelicula>> getByGenero(@PathVariable Genero genero) {
        return ResponseEntity.ok(peliculaService.findByGenero(genero));
    }

    // ---- SEARCH BY TITULO ----
    @GetMapping("/buscar")
    public ResponseEntity<List<Pelicula>> buscar(@RequestParam String titulo) {
        return ResponseEntity.ok(peliculaService.findByTitulo(titulo));
    }

    // ---- CREATE ----
    @PostMapping
    public ResponseEntity<Pelicula> create(@RequestBody Pelicula pelicula) {
        Pelicula nueva = peliculaService.save(pelicula);
        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }

    // ---- UPDATE ----
    @PutMapping("/{id}")
    public ResponseEntity<Pelicula> update(@PathVariable Long id, @RequestBody Pelicula pelicula) {
        try {
            return ResponseEntity.ok(peliculaService.update(id, pelicula));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ---- DELETE ----
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            peliculaService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
