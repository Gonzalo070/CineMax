package com.cinemax.model;

import com.cinemax.model.enums.Genero;
import com.cinemax.model.interfaces.IPromocion;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pelicula")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pelicula implements IPromocion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Genero genero;

    /**
     * Implementación de IPromocion.
     * Devuelve un 10% de descuento base.
     * Podés ajustar la lógica según el género, temporada, etc.
     */
    @Override
    public float obtenerDescuento() {
        return 0.10f; // 10% de descuento
    }
}
