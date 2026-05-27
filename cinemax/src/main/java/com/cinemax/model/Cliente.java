package com.cinemax.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Clase padre de la jerarquía Cliente.
 * Estrategia JOINED: tabla cliente con datos comunes,
 * tabla cliente_vip agrega el descuento.
 */
@Entity
@Table(name = "cliente")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String email;
}
