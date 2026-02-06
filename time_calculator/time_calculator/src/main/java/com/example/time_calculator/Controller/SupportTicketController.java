package com.example.time_calculator.Controller;

import com.example.time_calculator.Entity.SupportTicket;
import com.example.time_calculator.Entity.SupportTicketMessage;
import com.example.time_calculator.Repository.SupportTicketRepository;
import com.example.time_calculator.Service.SupportTicketService;
import com.example.time_calculator.dto.SupportTicketDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class SupportTicketController {
    @Autowired
    private SupportTicketService service;

    @GetMapping("/ticket/all")
    public Page<SupportTicket> getAllSupportTicket(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        return service.getAllSupportTicket(page, size);
    }


    @GetMapping("/ticket")
    public SupportTicket getSupportTicket(@RequestParam Long id){
        return service.GetSupportTicketById(id);
    }

    @PutMapping("/ticket/edit")
    public SupportTicket updateSupportTicketStatus(@RequestParam Long id, @RequestBody SupportTicketDTO supportTicket){
        return service.updateSupportTicketById(id, supportTicket);
    }
}
