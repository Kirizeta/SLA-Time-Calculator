package com.example.time_calculator.Controller;

import com.example.time_calculator.Entity.ResUsers;
import com.example.time_calculator.Repository.ResUsersRepository;
import com.example.time_calculator.Security.JwtService;
import com.example.time_calculator.Service.AuthService;
import com.example.time_calculator.dto.LoginRequestDTO;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final ResUsersRepository repository;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDTO request,
                        HttpServletResponse response) {

        ResUsers user = authService.login(
                request.getLogin(),
                request.getPassword()
        );

        // 🔥 ambil role dari DB
        List<String> roles = repository.findGroupNamesByLogin(user.getLogin());

        String token = jwtService.generateToken(user.getLogin(), roles);

        ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofHours(2))
                .sameSite("Strict")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

        return "Login success";
    }

    @GetMapping("/me")
    public String getCurrentUser(Authentication authentication) {

        String username = authentication.getName();

        return repository.findPartnerNameByLogin(username);
    }

    @PostMapping("/logout")
    public String logout(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        response.addHeader("Set-Cookie", cookie.toString());

        return "Logout success";


    }
}