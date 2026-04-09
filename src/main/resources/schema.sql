-- ============================================================
-- my-react-app DDL  (PostgreSQL)
-- Spring Boot 시작 시 schema.sql 자동 실행
-- ============================================================

CREATE TABLE IF NOT EXISTS activities (
    id          BIGSERIAL    PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    description TEXT         NOT NULL,
    image_url   VARCHAR(500),
    metadata    JSONB
);

CREATE TABLE IF NOT EXISTS csr_payments (
    id       BIGSERIAL       PRIMARY KEY,
    title    VARCHAR(200)    NOT NULL,
    amount   NUMERIC(15, 0)  NOT NULL,
    category VARCHAR(50)     NOT NULL,
    date     DATE            NOT NULL
);

CREATE TABLE IF NOT EXISTS donation_records (
    id        BIGSERIAL    PRIMARY KEY,
    date      DATE         NOT NULL,
    recipient VARCHAR(200) NOT NULL,
    category  VARCHAR(50)  NOT NULL,
    amount    BIGINT       NOT NULL,
    status    VARCHAR(20)  NOT NULL,
    UNIQUE (date, recipient, amount)
);

CREATE TABLE IF NOT EXISTS volunteer_applications (
    id         BIGSERIAL    PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    phone      VARCHAR(20)  NOT NULL,
    activity   VARCHAR(200) NOT NULL,
    message    TEXT,
    applied_at TIMESTAMP    NOT NULL DEFAULT now()
);
