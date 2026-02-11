package com.example.time_calculator.Service;

import com.example.time_calculator.Entity.SupportTicket;
import com.example.time_calculator.Repository.SupportTicketRepository;
import com.example.time_calculator.dto.SupportTicketDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class SupportTicketService {

    @Autowired
    SupportTicketRepository supportTicketRepository;

    /* ================= SAFE GET BY ID ================= */

    public SupportTicket getSupportTicketByIdSafe(Long id) {
        return supportTicketRepository.findById(id).orElse(null);
    }

    /* ================= GET ALL ================= */

    public Page<SupportTicket> getAllSupportTicket(int page, int size){

        Pageable pageable = PageRequest.of(page, size);
        Page<SupportTicket> tickets = supportTicketRepository.findAll(pageable);

        tickets.forEach(ticket -> {

            try {
                if(ticket.getPartner() != null)
                    ticket.getPartner().getName();

                if(ticket.getProduct() != null)
                    ticket.getProduct().getName();

                if(ticket.getPriority() != null)
                    ticket.getPriority().getName();

                if(ticket.getUser() != null)
                    ticket.getUser().getId();

            } catch (Exception e){
                System.out.println("Lazy load error : " + e.getMessage());
            }
        });

        return tickets;
    }

    /* ================= UPDATE ================= */

    public SupportTicket updateSupportTicketById(Long id, SupportTicketDTO dto) {

        SupportTicket existingTicket = supportTicketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found " + id));

        /* CREATE */
        if(dto.getCreateDateTime() != null){
            existingTicket.setCreateDateTime(dto.getCreateDateTime());
            existingTicket.setCreateDate(dto.getCreateDateTime().minusHours(7));
        }

        /* START RES */
        if(dto.getStartResolutionTime() != null){
            existingTicket.setStartResolutionTime(dto.getStartResolutionTime());
            existingTicket.setStartResolutionTimeNoGmt(
                    dto.getStartResolutionTime().minusHours(7)
            );
        }

        /* END RES */
        if(dto.getEndResolutionTime() != null){
            existingTicket.setEndResolutionTime(dto.getEndResolutionTime());
            existingTicket.setEndResolutionTimeNoGmt(
                    dto.getEndResolutionTime().minusHours(7)
            );

            existingTicket.setCloseTime(
                    dto.getEndResolutionTime().minusHours(7)
            );
        }

        /* CLOSE DATE */
        if(existingTicket.getCloseTime() != null){
            existingTicket.setCloseDate(
                    existingTicket.getCloseTime().toLocalDate()
            );
        }

        /* TOTAL RES */
        if(existingTicket.getCreateDateTime() != null &&
                existingTicket.getStartResolutionTime() != null &&
                existingTicket.getEndResolutionTime() != null){

            long responseMs = Duration.between(
                    existingTicket.getCreateDateTime(),
                    existingTicket.getStartResolutionTime()
            ).toMillis();

            long resolutionMs = Duration.between(
                    existingTicket.getStartResolutionTime(),
                    existingTicket.getEndResolutionTime()
            ).toMillis();

            double totalHours = (responseMs + resolutionMs) / (1000.0 * 60 * 60);

            existingTicket.setResponseToClose(totalHours);
        }

        return supportTicketRepository.save(existingTicket);
    }
}