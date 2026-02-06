package com.example.time_calculator.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "website_support_ticket_priority")
@Data
public class TicketPriority {

    @Id
    private Long id;

    private String name;
}