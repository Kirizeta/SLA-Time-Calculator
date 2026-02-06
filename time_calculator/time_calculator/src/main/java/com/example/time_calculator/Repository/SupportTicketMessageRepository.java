package com.example.time_calculator.Repository;

import com.example.time_calculator.Entity.SupportTicketMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SupportTicketMessageRepository extends JpaRepository<SupportTicketMessage,Long> {
//    Optional<SupportTicketMessage> findById(Long id);
    List<SupportTicketMessage> findAllByTicketId(Long id);
}
