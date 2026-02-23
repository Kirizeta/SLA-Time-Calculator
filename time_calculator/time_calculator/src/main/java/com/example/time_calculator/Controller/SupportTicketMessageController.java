package com.example.time_calculator.Controller;

import com.example.time_calculator.Entity.SupportTicket;
import com.example.time_calculator.Entity.SupportTicketMessage;
import com.example.time_calculator.Service.SupportTicketMessageServivce;
import com.example.time_calculator.dto.SupportTicketDTO;
import com.example.time_calculator.dto.SupportTicketMessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SupportTicketMessageController {
    @Autowired
    SupportTicketMessageServivce supportTicketMessageServivce;

    @GetMapping("/message")
    public List<SupportTicketMessage> getAllSupportTicketMessages(){
        return supportTicketMessageServivce.GetAllSupportTicketMessage();
    }

    @GetMapping("/all")
    public List<SupportTicketMessage> getSupportTicketMessages(@RequestParam Long id){
        return supportTicketMessageServivce.findSupportTicketMessagesByTicketId(id);
    }
    @CrossOrigin(origins = "*")

    @PutMapping("/ticket/message/edit")
    public SupportTicketMessage updateSupportTicketMessage(
            @RequestParam Long id,
            @RequestBody SupportTicketMessageDTO dto
    ) {
        return supportTicketMessageServivce.updateSupportTicketByIdMassage(id, dto);
    }

}
