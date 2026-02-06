package com.example.time_calculator.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "res_partner")
@Data
public class ResPartner {

    @Id
    private Long id;

    private String name;
}

