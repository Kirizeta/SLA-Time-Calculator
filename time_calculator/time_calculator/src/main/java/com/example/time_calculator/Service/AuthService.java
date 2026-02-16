package com.example.time_calculator.Service;

import com.example.time_calculator.Entity.ResUsers;
import com.example.time_calculator.Repository.LoginRepository;
import com.example.time_calculator.Security.PasswordUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final LoginRepository loginRepository;

    public ResUsers login(String login, String password) {

        ResUsers user = loginRepository
                .findByLoginAndActiveTrue(login)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan / tidak aktif"));

        boolean match = PasswordUtil.verify(password, user.getPassword());

        if (!match) {
            throw new RuntimeException("Password salah");
        }

        user.setPassword(null);
        return user;
    }
}










//package com.example.time_calculator.Service;
//
//import com.example.time_calculator.dto.LoginRequestDTO;
//import com.example.time_calculator.Entity.ResUsers;
//import com.example.time_calculator.Repository.LoginRepository;
////import com.example.time_calculator.Security.PasswordUtil;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class AuthService {
//
//    public ResUsers login(String login, String password) {
//
//
//        if ("admin@ptap.co.id".equals(login) && "ptap1234!".equals(password)) {
//
//            ResUsers user = new ResUsers();
//            user.setId(1L);
//            user.setLogin(login);
//
//
//            return user;
//        }
//
//        throw new RuntimeException("Username / Password salah");
//    }
//}
