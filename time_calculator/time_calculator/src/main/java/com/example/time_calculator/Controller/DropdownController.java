package com.example.time_calculator.Controller;

import com.example.time_calculator.Entity.*;
import com.example.time_calculator.Repository.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dropdown")
@RequiredArgsConstructor
public class DropdownController {

    private final ResPartnerRepository partnerRepository;
    private final ProductTemplateRepository productRepository;
    private final TicketPriorityRepository priorityRepository;

    /* CUSTOMER */
    @GetMapping("/customers")
    public List<ResPartner> getCustomers(
            @RequestParam(defaultValue = "") String search
    ) {
        return partnerRepository
                .findTop20ByNameContainingIgnoreCase(search);
    }

    /* PRODUCT */
    @GetMapping("/products")
    public List<ProductTemplate> getProducts(
            @RequestParam(defaultValue = "") String search
    ) {
        return productRepository
                .findTop20ByNameContainingIgnoreCase(search);
    }

    /* PRIORITY */
    @GetMapping("/priorities")
    public List<TicketPriority> getPriorities() {
        return priorityRepository.findAll();
    }
}