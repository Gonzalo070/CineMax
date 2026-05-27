package com.cinemax.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cine")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String direccion;

    // 1 Cine -> N Empleados
    @OneToMany(mappedBy = "cine", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("cine-empleados")
    private List<Empleado> empleados = new ArrayList<>();

    // 1 Cine -> N Salas
    @OneToMany(mappedBy = "cine", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("cine-salas")
    private List<Sala> salas = new ArrayList<>();

    // 1 Cine -> N Ventas
    @OneToMany(mappedBy = "cine", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("cine-ventas")
    private List<Venta> ventas = new ArrayList<>();

    // 1 Cine -> N Compras
    @OneToMany(mappedBy = "cine", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("cine-compras")
    private List<Compra> compras = new ArrayList<>();
}
