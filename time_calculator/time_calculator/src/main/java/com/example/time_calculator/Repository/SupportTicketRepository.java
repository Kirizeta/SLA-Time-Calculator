package com.example.time_calculator.Repository;

import com.example.time_calculator.Entity.SupportTicket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {

    @EntityGraph(attributePaths = {
            "partner",
            "product",
            "priority",
            "user",
//            "user.employees"
    })
    Page<SupportTicket> findAll(Pageable pageable);
}

