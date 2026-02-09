package com.example.time_calculator.Service;

import com.example.time_calculator.Entity.SupportTicketMessage;
import com.example.time_calculator.Repository.SupportTicketMessageRepository;
import com.example.time_calculator.dto.SupportTicketMessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupportTicketMessageServivce {
    @Autowired
    SupportTicketMessageRepository repository;

    public List<SupportTicketMessage> GetAllSupportTicketMessage() {
        return repository.findAll();
    }

    public SupportTicketMessage findSupportTicketMessageById(Long id) {
        Optional<SupportTicketMessage> message = repository.findById(id);

        if(message.isEmpty()){
            return null;
        }
        return message.get();
    }

//    Buat yang return array tapi ambil dari ticket_id
    public List<SupportTicketMessage> findSupportTicketMessagesByTicketId(Long ticketId) {
        List<SupportTicketMessage> messages = repository.findAllByTicketId(ticketId);

        return messages;
    }

    public SupportTicketMessage updateSupportTicketByIdMassage(
            Long id,
            SupportTicketMessageDTO dto
    ) {

        SupportTicketMessage existingMessage =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Message not found id=" + id));

        if (dto.getCreateDate() != null) {
            existingMessage.setCreateDate(dto.getCreateDate());
        }

        if (dto.getResponseTime() != null) {
            existingMessage.setResponseTime(dto.getResponseTime());
        }

        if (dto.getResolutionTime() != null) {
            existingMessage.setResolutionTime(dto.getResolutionTime());
        }

        System.out.println("Existing message : " +existingMessage);

        return repository.save(existingMessage);
    }
}
