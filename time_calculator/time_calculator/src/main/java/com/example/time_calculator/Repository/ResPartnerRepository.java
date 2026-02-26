package com.example.time_calculator.Repository;

import com.example.time_calculator.Entity.ResPartner;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResPartnerRepository extends JpaRepository<ResPartner, Long> {

    List<ResPartner> findTop20ByNameContainingIgnoreCase(String name);

}