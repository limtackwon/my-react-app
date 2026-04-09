-- ============================================================
-- 초기 기부 레코드 데이터
-- donation_records 가 비어있을 때만 삽입
-- ============================================================

INSERT INTO donation_records (date, recipient, category, amount, status)
SELECT v.date, v.recipient, v.category, v.amount, v.status
FROM (VALUES
  ('2025-04-15'::DATE, '초록우산 어린이재단', '아동교육', 50000000::BIGINT, '집행완료'),
  ('2025-04-01'::DATE, '굿네이버스',          '식품지원', 30000000::BIGINT, '집행완료'),
  ('2025-03-20'::DATE, '대한적십자사',        '의료지원', 20000000::BIGINT, '집행완료'),
  ('2025-03-10'::DATE, '환경운동연합',        '환경보호', 15000000::BIGINT, '집행완료'),
  ('2025-02-28'::DATE, '사랑의 쌀 나눔',     '식품지원', 18000000::BIGINT, '집행완료'),
  ('2025-02-15'::DATE, '한국노인복지관',      '노인복지', 25000000::BIGINT, '집행완료')
) AS v(date, recipient, category, amount, status)
WHERE NOT EXISTS (SELECT 1 FROM donation_records LIMIT 1);
