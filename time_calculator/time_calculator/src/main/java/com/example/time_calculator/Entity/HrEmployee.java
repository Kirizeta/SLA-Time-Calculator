package com.example.time_calculator.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hr_employee")
@Data
public class HrEmployee {

    @Id
    private Long id;

    private String name;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private ResUsers user;
}