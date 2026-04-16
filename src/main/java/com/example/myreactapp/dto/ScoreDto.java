package com.example.myreactapp.dto;

import java.time.LocalDateTime;

public class ScoreDto {

    private Long          id;
    private String        username;
    private Long          score;
    private String        ipAddress;
    private LocalDateTime playedAt;

    // ── constructors ──────────────────────────────────────────
    public ScoreDto() {}

    public ScoreDto(String username, Long score, String ipAddress) {
        this.username  = username;
        this.score     = score;
        this.ipAddress = ipAddress;
    }

    // ── getters / setters ────────────────────────────────────
    public Long          getId()          { return id; }
    public void          setId(Long id)   { this.id = id; }

    public String        getUsername()             { return username; }
    public void          setUsername(String v)     { this.username = v; }

    public Long          getScore()                { return score; }
    public void          setScore(Long v)          { this.score = v; }

    public String        getIpAddress()            { return ipAddress; }
    public void          setIpAddress(String v)    { this.ipAddress = v; }

    public LocalDateTime getPlayedAt()             { return playedAt; }
    public void          setPlayedAt(LocalDateTime v) { this.playedAt = v; }
}
