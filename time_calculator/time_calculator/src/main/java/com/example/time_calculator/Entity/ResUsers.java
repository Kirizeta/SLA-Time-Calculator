package com.example.time_calculator.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "res_users")
@Data
public class ResUsers {

    @Id
    private Long id;

    private Boolean share;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private HrEmployee employee;
}