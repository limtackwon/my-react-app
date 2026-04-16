-- ============================================================
-- Tetris High Score DDL  (PostgreSQL)
-- Spring Boot 시작 시 자동 실행
-- ============================================================

CREATE TABLE IF NOT EXISTS tetris_scores (
    id          BIGSERIAL    PRIMARY KEY,
    username    VARCHAR(20)  NOT NULL,
    score       BIGINT       NOT NULL,
    ip_address  VARCHAR(45)  NOT NULL,
    played_at   TIMESTAMP    NOT NULL DEFAULT now()
);

-- Unique constraints: one username, one IP per leaderboard entry
CREATE UNIQUE INDEX IF NOT EXISTS uq_tetris_username ON tetris_scores (username);
CREATE UNIQUE INDEX IF NOT EXISTS uq_tetris_ip       ON tetris_scores (ip_address);
