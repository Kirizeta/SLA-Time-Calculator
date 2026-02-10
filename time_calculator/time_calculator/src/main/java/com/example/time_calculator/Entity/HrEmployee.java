package com.example.time_calculator.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hr_employee")
@Data
public class HrEmployee {

    @Id
    @Column(name = "id")
    private Long id;

    private String name;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private ResUsers user;
}