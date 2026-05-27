package com.cinemax.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "entrada")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Entrada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double precio;

    @Column(nullable = false)
    private String asiento;

    // N Entradas -> 1 Funcion
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "funcion_id", nullable = false)
    @JsonBackReference("funcion-entradas")
    private Funcion funcion;

    // N Entradas -> 1 Venta
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venta_id", nullable = false)
    @JsonBackReference("venta-entradas")
    private Venta venta;
}
