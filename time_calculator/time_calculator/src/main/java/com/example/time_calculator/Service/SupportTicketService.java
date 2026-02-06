package com.example.time_calculator.Service;

import com.example.time_calculator.Entity.SupportTicket;
import com.example.time_calculator.Repository.SupportTicketRepository;
import com.example.time_calculator.dto.SupportTicketDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.Duration;

@Service
public class SupportTicketService {
    @Autowired
    SupportTicketRepository supportTicketRepository;

    public SupportTicket GetSupportTicketById(Long id) {
        return supportTicketRepository.findById(id).orElse(null);
    }

    public Page<SupportTicket> getAllSupportTicket(int page, int size){

        Pageable pageable = PageRequest.of(page, size);

        Page<SupportTicket> tickets = supportTicketRepository.findAll(pageable);

        // Optional: kalau mau trigger lazy load / debug
        tickets.forEach(ticket -> {

            if(ticket.getPartner() != null)
                ticket.getPartner().getName();

            if(ticket.getProduct() != null)
                ticket.getProduct().getName();

            if(ticket.getPriority() != null)
                ticket.getPriority().getName();

            if(ticket.getUser() != null)
                ticket.getUser().getId();
        });

        return tickets;
    }



    public SupportTicket updateSupportTicketById(Long id, SupportTicketDTO supportTicket) {

        SupportTicket existingTicket = GetSupportTicketById(id);

        existingTicket.setCreateDate(supportTicket.getCreateDateTime().minusHours(7));
        existingTicket.setStartResolutionTimeNoGmt(supportTicket.getCreateDateTime().minusHours(7));
        existingTicket.setCloseTime(supportTicket.getEndResolutionTime().minusHours(7));
        existingTicket.setEndResolutionTimeNoGmt(supportTicket.getEndResolutionTime().minusHours(7));

        existingTicket.setCloseDate(existingTicket.getCloseTime().toLocalDate());

        existingTicket.setCreateDateTime(supportTicket.getCreateDateTime());
        existingTicket.setStartResolutionTime(supportTicket.getStartResolutionTime());
        existingTicket.setEndResolutionTime(supportTicket.getEndResolutionTime());


        double totalResolutionTime =
                Duration.between(
                        existingTicket.getCreateDateTime(),
                        existingTicket.getEndResolutionTime()
                ).toMillis() / (1000.0 * 60 * 60);

        existingTicket.setResponseToClose(totalResolutionTime);


        return supportTicketRepository.save(existingTicket);
    }
}