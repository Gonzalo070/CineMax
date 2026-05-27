package com.cinemax.model;

import com.cinemax.model.enums.TipoPago;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pago")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private double monto;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoPago tipo;
}
