package com.example.time_calculator.Entity;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "product_template")
@Data
public class ProductTemplate {

    @Id
    private Long id;

    private String name;
}
