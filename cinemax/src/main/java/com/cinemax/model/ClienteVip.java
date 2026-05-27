package com.cinemax.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cliente_vip")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ClienteVip extends Cliente {

    private float descuento;
}
