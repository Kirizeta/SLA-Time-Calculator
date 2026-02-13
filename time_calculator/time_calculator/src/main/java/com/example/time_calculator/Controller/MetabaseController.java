package com.example.time_calculator.Controller;

import com.example.time_calculator.Service.MetabaseService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/metabase")
@CrossOrigin("*")
public class MetabaseController {

    private final MetabaseService metabaseService;

    public MetabaseController(MetabaseService metabaseService) {
        this.metabaseService = metabaseService;
    }

    @GetMapping("/dashboard")
    public String getDashboard() {
        return metabaseService.generateDashboardEmbedUrl();
    }
}
