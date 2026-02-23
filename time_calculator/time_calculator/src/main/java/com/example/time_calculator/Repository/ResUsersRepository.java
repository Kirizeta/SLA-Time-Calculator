package com.example.time_calculator.Repository;

import com.example.time_calculator.Entity.ResUsers;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ResUsersRepository extends JpaRepository<ResUsers, Long> {

    Optional<ResUsers> findByLoginAndActiveTrue(String login);

    @Query("""
        SELECT p.name
        FROM ResUsers u
        JOIN u.partner p
        WHERE u.login = :login
    """)
    String findPartnerNameByLogin(@Param("login") String login);
}