package com.cinemax.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Clase hija de Sala.
 * Su tabla solo agrega la columna 'beneficios' y una FK a sala(id).
 */
@Entity
@Table(name = "sala_vip")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class SalaVip extends Sala {

    private String beneficios;
}
