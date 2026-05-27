package com.cinemax.controller;

import com.cinemax.model.Cine;
import com.cinemax.service.CineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Endpoint base: /api/cines
 *
 * GET    /api/cines              → listar todos
 * GET    /api/cines/{id}         → buscar por id
 * GET    /api/cines/buscar?nombre=X → buscar por nombre
 * POST   /api/cines              → crear
 * PUT    /api/cines/{id}         → actualizar
 * DELETE /api/cines/{id}         → eliminar
 */
@RestController
@RequestMapping("/api/cines")
@RequiredArgsConstructor
public class CineController {

    private final CineService cineService;

    // ---- GET ALL ----
    @GetMapping
    public ResponseEntity<List<Cine>> getAll() {
        return ResponseEntity.ok(cineService.findAll());
    }

    // ---- GET BY ID ----
    @GetMapping("/{id}")
    public ResponseEntity<Cine> getById(@PathVariable Long id) {
        return cineService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ---- SEARCH BY NOMBRE ----
    @GetMapping("/buscar")
    public ResponseEntity<List<Cine>> buscar(@RequestParam String nombre) {
        return ResponseEntity.ok(cineService.findByNombre(nombre));
    }

    // ---- CREATE ----
    @PostMapping
    public ResponseEntity<Cine> create(@RequestBody Cine cine) {
        Cine nuevo = cineService.save(cine);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    // ---- UPDATE ----
    @PutMapping("/{id}")
    public ResponseEntity<Cine> update(@PathVariable Long id, @RequestBody Cine cine) {
        try {
            return ResponseEntity.ok(cineService.update(id, cine));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ---- DELETE ----
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            cineService.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
