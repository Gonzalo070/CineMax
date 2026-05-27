package com.cinemax.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Clase padre de la jerarquía de Sala.
 * Se usa la estrategia JOINED: tabla sala + tabla sala_vip con FK.
 * Es la más limpia para herencia en JPA cuando las subclases tienen atributos propios.
 */
@Entity
@Table(name = "sala")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int numero;

    @Column(nullable = false)
    private int capacidad;

    // N Salas -> 1 Cine
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cine_id", nullable = false)
    @JsonBackReference("cine-salas")
    private Cine cine;

    // 1 Sala -> N Funciones
    @OneToMany(mappedBy = "sala", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("sala-funciones")
    private List<Funcion> funciones = new ArrayList<>();
}
