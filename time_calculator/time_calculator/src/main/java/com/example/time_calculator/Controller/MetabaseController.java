package com.example.time_calculator.Controller;

import com.example.time_calculator.Repository.ResUsersRepository;
import com.example.time_calculator.Service.MetabaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/metabase")
@RequiredArgsConstructor
public class MetabaseController {

    private final MetabaseService metabaseService;
    private final ResUsersRepository repository;

    @GetMapping("/dashboard")
    public String getDashboard(Authentication authentication) {

        String username = authentication.getName();

        String partnerName = repository.findPartnerNameByLogin(username);

        return metabaseService.generateDashboardEmbedUrl(partnerName);
    }
}