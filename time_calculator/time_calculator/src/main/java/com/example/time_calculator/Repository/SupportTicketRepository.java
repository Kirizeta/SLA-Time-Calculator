package com.example.time_calculator.Repository;

import com.example.time_calculator.Entity.SupportTicket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {

    @EntityGraph(attributePaths = {
            "partner",
            "product",
            "priority",
            "user"
    })
    Page<SupportTicket> findAll(Pageable pageable);

    long countByCreateDateTimeBetween(
            LocalDateTime start,
            LocalDateTime end
    );
}