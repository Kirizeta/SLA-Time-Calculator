package com.example.time_calculator.Service;

import com.example.time_calculator.Entity.ResUsers;
import com.example.time_calculator.Entity.SupportTicket;
import com.example.time_calculator.Repository.SupportTicketRepository;
import com.example.time_calculator.dto.SupportTicketDTO;
import com.example.time_calculator.dto.CreateTicketDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class SupportTicketService {

    @Autowired
    SupportTicketRepository supportTicketRepository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /* ===================================================== */
    /* ================= SAFE GET BY ID ===================== */
    /* ===================================================== */

    public SupportTicket getSupportTicketByIdSafe(Long id) {
        return supportTicketRepository.findById(id).orElse(null);
    }

    /* ===================================================== */
    /* ================= GET ALL ============================ */
    /* ===================================================== */

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

    /* ===================================================== */
    /* ================= CREATE TICKET ====================== */
    /* ===================================================== */

    public SupportTicket createTicket(
            CreateTicketDTO dto,
            ResUsers currentUser
    ) {

        SupportTicket ticket = new SupportTicket();

        /* ===== DATA DARI FRONTEND ===== */

        ticket.setSubject(dto.getSubject());
        ticket.setDescriptionText(dto.getDescriptionText());
        ticket.setPartnerId(dto.getPartnerId());
        ticket.setPriorityId(dto.getPriorityId());
        ticket.setProductId(dto.getProductId());
        ticket.setCategoryId(dto.getCategoryId());
        ticket.setSubCategoryId(dto.getSubCategoryId());
        ticket.setChannel(dto.getChannel());

        /* ===== AUTO SYSTEM FIELD ===== */

        ticket.setCreateUserId(currentUser.getId());
        ticket.setCreateUid(currentUser.getId());
        ticket.setCompanyId(currentUser.getCompanyId());

        ticket.setStateId(1L);
        ticket.setStateName("Open");
        ticket.setStateTicket("open");

        ticket.setCreateDateTime(LocalDateTime.now());
        ticket.setCreateDate(LocalDateTime.now().minusHours(7));

        ticket.setSlaActive(true);
        ticket.setNotifL1(true);
        ticket.setNotifManager(true);

        ticket.setTicketNumber(generateTicketNumber());

        return supportTicketRepository.save(ticket);
    }

    private String generateTicketNumber() {

        LocalDate today = LocalDate.now();

        long countToday = supportTicketRepository
                .countByCreateDateTimeBetween(
                        today.atStartOfDay(),
                        today.atTime(23, 59, 59)
                );

        String date = today.format(DateTimeFormatter.BASIC_ISO_DATE);

        return "TCK-" + date + "-" + String.format("%04d", countToday + 1);
    }

    /* ===================================================== */
    /* ================= UPDATE (EDIT TICKET) =============== */
    /* ===================================================== */

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

    @Transactional
    public void hardDeleteTicket(Long id) {

        // VALIDASI dulu (opsional tapi recommended)
        SupportTicket ticket = supportTicketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket tidak ditemukan"));

        // Misal: jangan delete kalau sudah closed
        if ("Closed".equalsIgnoreCase(ticket.getStateName())) {
            throw new RuntimeException("Ticket sudah closed, tidak boleh dihapus");
        }

        // FK CHILD
        jdbcTemplate.update("DELETE FROM ptap_attachment_ticket WHERE ticket_id = ?", id);
        jdbcTemplate.update("DELETE FROM ptap_emp_l2_ticket_rel WHERE ticket_id = ?", id);
        jdbcTemplate.update("DELETE FROM ptap_emp_l3_ticket_rel WHERE ticket_id = ?", id);
        jdbcTemplate.update("DELETE FROM ptap_emp_l4_ticket_rel WHERE ticket_id = ?", id);
        jdbcTemplate.update("DELETE FROM ptap_incident_log WHERE ticket_id = ?", id);
        jdbcTemplate.update("DELETE FROM ptap_pic_rating WHERE ticket_id = ?", id);
        jdbcTemplate.update("DELETE FROM ptap_web_ticket_hr_employee_rel WHERE ticket_id = ?", id);

        jdbcTemplate.update("DELETE FROM website_support_ticket_message WHERE ticket_id = ?", id);

        jdbcTemplate.update("DELETE FROM mail_followers WHERE res_model = 'website.support.ticket' AND res_id = ?", id);
        jdbcTemplate.update("DELETE FROM mail_activity WHERE res_model = 'website.support.ticket' AND res_id = ?", id);
        jdbcTemplate.update("DELETE FROM ir_attachment WHERE res_model = 'website.support.ticket' AND res_id = ?", id);
        jdbcTemplate.update("DELETE FROM mail_message WHERE model = 'website.support.ticket' AND res_id = ?", id);

        // PARENT
        jdbcTemplate.update("DELETE FROM website_support_ticket WHERE id = ?", id);
    }
}