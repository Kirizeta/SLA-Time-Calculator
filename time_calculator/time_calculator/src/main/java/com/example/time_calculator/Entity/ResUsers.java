package com.example.time_calculator.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "res_users")
@Data
public class ResUsers {

    @Id
    private Long id;

    private Boolean share;

    private Boolean active;

    private String login;

    private String password;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<HrEmployee> employees;
}