package com.example.time_calculator.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "active")
    private Boolean active;   // ⭐ WAJIB

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonIgnore
    private ResUsers user;
}
