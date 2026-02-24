package com.example.time_calculator.Repository;

import com.example.time_calculator.Entity.ResUsers;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
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

    @Query(value = """
        SELECT g.name
        FROM res_groups g
        JOIN res_groups_users_rel rel ON rel.gid = g.id
        JOIN res_users u ON u.id = rel.uid
        WHERE u.login = :login
    """, nativeQuery = true)
    List<String> findGroupNamesByLogin(@Param("login") String login);
}