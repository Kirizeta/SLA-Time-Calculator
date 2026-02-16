package com.example.time_calculator.Controller;

import com.example.time_calculator.dto.LoginRequestDTO;
import com.example.time_calculator.Entity.ResUsers;
import com.example.time_calculator.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController{

    private final AuthService authService;

    @PostMapping("/login")
    public ResUsers login(@RequestBody LoginRequestDTO request) {
        return authService.login(request.getLogin(), request.getPassword());
    }
}
