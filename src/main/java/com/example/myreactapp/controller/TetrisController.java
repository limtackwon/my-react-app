package com.example.myreactapp.controller;

import com.example.myreactapp.dto.ScoreDto;
import com.example.myreactapp.mapper.ScoreMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TetrisController {

    private final ScoreMapper scoreMapper;

    public TetrisController(ScoreMapper scoreMapper) {
        this.scoreMapper = scoreMapper;
    }

    // ── Health check (used by Render blueprint) ───────────────
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "ok"));
    }

    // ── GET /api/scores  → top-10 leaderboard ────────────────
    @GetMapping("/scores")
    public ResponseEntity<List<ScoreDto>> getScores() {
        return ResponseEntity.ok(scoreMapper.findTopScores(10));
    }

    /**
     * POST /api/scores
     * Body: { "username": "...", "score": 12345 }
     *
     * Rules:
     *  1. Username globally unique (case-insensitive).
     *  2. One entry per IP address.
     *  3. Same IP + same username → update score if higher.
     */
    @PostMapping("/scores")
    public ResponseEntity<?> submitScore(
            @RequestBody ScoreDto body,
            HttpServletRequest request) {

        // Basic validation
        if (body.getUsername() == null || body.getUsername().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "USERNAME_REQUIRED"));
        }
        String username = body.getUsername().trim();
        if (username.length() < 2 || username.length() > 20) {
            return ResponseEntity.badRequest().body(Map.of("error", "USERNAME_LENGTH"));
        }
        if (!username.matches("[A-Za-z0-9_\\-]+")) {
            return ResponseEntity.badRequest().body(Map.of("error", "USERNAME_INVALID_CHARS"));
        }
        if (body.getScore() == null || body.getScore() < 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "SCORE_INVALID"));
        }

        String ip = resolveClientIp(request);

        ScoreDto byUsername = scoreMapper.findByUsername(username);
        ScoreDto byIp       = scoreMapper.findByIpAddress(ip);

        // Case 1: username taken by a DIFFERENT IP
        if (byUsername != null && !byUsername.getIpAddress().equals(ip)) {
            return ResponseEntity.badRequest().body(Map.of("error", "USERNAME_TAKEN"));
        }

        // Case 2: IP already registered with a DIFFERENT username
        if (byIp != null && !byIp.getUsername().equalsIgnoreCase(username)) {
            return ResponseEntity.badRequest().body(Map.of("error", "IP_ALREADY_REGISTERED",
                    "existingUsername", byIp.getUsername()));
        }

        // Case 3: Same IP + same username → update if score improved
        if (byIp != null) {
            if (body.getScore() > byIp.getScore()) {
                byIp.setScore(body.getScore());
                scoreMapper.update(byIp);
            }
            return ResponseEntity.ok(byIp);
        }

        // Case 4: New entry
        ScoreDto newScore = new ScoreDto(username, body.getScore(), ip);
        scoreMapper.insert(newScore);
        return ResponseEntity.ok(newScore);
    }

    // ── IP resolution (handles Render / nginx reverse proxy) ──
    private String resolveClientIp(HttpServletRequest req) {
        String xff = req.getHeader("X-Forwarded-For");
        if (xff != null && !xff.isBlank()) {
            return xff.split(",")[0].trim();
        }
        String realIp = req.getHeader("X-Real-IP");
        if (realIp != null && !realIp.isBlank()) {
            return realIp.trim();
        }
        return req.getRemoteAddr();
    }
}
