package com.example.time_calculator.Repository;

import com.example.time_calculator.Entity.ProductTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductTemplateRepository extends JpaRepository<ProductTemplate, Long> {

    List<ProductTemplate> findTop20ByNameContainingIgnoreCase(String name);

}