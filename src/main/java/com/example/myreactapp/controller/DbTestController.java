package com.example.myreactapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DbTestController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/db-test")
    public String dbTest() {
        try {
            String result = jdbcTemplate.queryForObject("SELECT version()", String.class);
            return "DB 연결 성공!\n" + result;
        } catch (Exception e) {
            return "DB 연결 실패: " + e.getMessage();
        }
    }
}
