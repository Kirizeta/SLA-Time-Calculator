package com.example.time_calculator.Controller;

import com.example.time_calculator.Entity.SupportTicket;
import com.example.time_calculator.Service.SupportTicketService;
import com.example.time_calculator.dto.SupportTicketDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ticket")

public class SupportTicketController {

    @Autowired
    private SupportTicketService service;

    /* ================= GET ALL ================= */

    @GetMapping("/all")
    public ResponseEntity<Page<SupportTicket>> getAllSupportTicket(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return ResponseEntity.ok(service.getAllSupportTicket(page, size));
    }

    /* ================= GET BY ID ================= */

    @GetMapping
    public ResponseEntity<?> getSupportTicket(@RequestParam Long id){

        SupportTicket ticket = service.getSupportTicketByIdSafe(id);

        if(ticket == null){
            return ResponseEntity
                    .status(404)
                    .body("Ticket tidak ditemukan : " + id);
        }

        return ResponseEntity.ok(ticket);
    }

    /* ================= UPDATE ================= */

    @PutMapping("/edit")
    public ResponseEntity<?> updateSupportTicketStatus(
            @RequestParam Long id,
            @RequestBody SupportTicketDTO supportTicket){

        return ResponseEntity.ok(
                service.updateSupportTicketById(id, supportTicket)
        );
    }
}