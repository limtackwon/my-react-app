package com.example.myreactapp;

import com.example.myreactapp.dto.ActivityDto;
import com.example.myreactapp.dto.CsrPaymentDto;
import com.example.myreactapp.mapper.ActivityMapper;
import com.example.myreactapp.mapper.CsrPaymentMapper;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class DataSeeder implements ApplicationRunner {

    private final CsrPaymentMapper csrPaymentMapper;
    private final ActivityMapper activityMapper;

    public DataSeeder(CsrPaymentMapper csrPaymentMapper, ActivityMapper activityMapper) {
        this.csrPaymentMapper = csrPaymentMapper;
        this.activityMapper   = activityMapper;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        seedPayments();
        seedActivities();
    }

    private void seedPayments() {
        if (csrPaymentMapper.count() > 0) return;

        Object[][] data = {
            {"초록우산 어린이재단 교육 지원", new BigDecimal("50000000"), "아동교육",  LocalDate.of(2025, 4, 15)},
            {"굿네이버스 식품 지원",          new BigDecimal("30000000"), "식품지원",  LocalDate.of(2025, 4,  1)},
            {"의료 취약계층 지원",             new BigDecimal("20000000"), "의료지원",  LocalDate.of(2025, 3, 20)},
            {"하천 환경 정화 캠페인",          new BigDecimal("15000000"), "환경보호",  LocalDate.of(2025, 3, 10)},
            {"독거노인 생활 지원",             new BigDecimal("25000000"), "노인복지",  LocalDate.of(2025, 2, 28)},
            {"아동 급식 지원 프로그램",         new BigDecimal("18000000"), "식품지원",  LocalDate.of(2025, 2, 15)},
            {"환경 교육 콘텐츠 개발",          new BigDecimal("12000000"), "환경보호",  LocalDate.of(2025, 1, 31)},
            {"노인 복지관 리모델링",            new BigDecimal("35000000"), "노인복지",  LocalDate.of(2025, 1, 15)},
            {"소아암 치료 지원",               new BigDecimal("45000000"), "의료지원",  LocalDate.of(2024, 12, 20)},
            {"방과후 학습 지원",               new BigDecimal("22000000"), "아동교육",  LocalDate.of(2024, 12,  5)},
        };

        for (Object[] row : data) {
            CsrPaymentDto dto = new CsrPaymentDto();
            dto.setTitle((String) row[0]);
            dto.setAmount((BigDecimal) row[1]);
            dto.setCategory((String) row[2]);
            dto.setDate((LocalDate) row[3]);
            csrPaymentMapper.insert(dto);
        }
    }

    private void seedActivities() {
        if (activityMapper.count() > 0) return;

        Object[][] data = {
            {"농촌 일손 돕기 봉사",
             "도농 상생을 위한 농촌 봉사 활동으로 48명이 참여하였습니다.",
             "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400",
             "{\"tags\":[\"농촌\",\"봉사\"],\"location\":\"경기 양평\",\"participants\":48}"},
            {"아동 교육 멘토링",
             "소외 계층 아동 대상 1:1 학습 멘토링을 진행하였습니다.",
             "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
             "{\"tags\":[\"교육\",\"아동\"],\"location\":\"서울 노원구\",\"participants\":32}"},
            {"환경 정화 캠페인",
             "한강 둔치 쓰레기 수거 및 환경 보호 캠페인을 진행하였습니다.",
             "https://images.unsplash.com/photo-1617952986600-802f965dcdbc?w=400",
             "{\"tags\":[\"환경\",\"캠페인\"],\"location\":\"서울 한강공원\",\"participants\":65}"},
            {"노인 복지관 방문",
             "명절 기간 독거노인 어르신 방문 및 선물 전달 행사를 진행하였습니다.",
             "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400",
             "{\"tags\":[\"노인\",\"복지\"],\"location\":\"서울 은평구\",\"participants\":20}"},
            {"헌혈 캠페인",
             "사내 헌혈 행사로 총 120유닛의 혈액을 기증하였습니다.",
             "https://images.unsplash.com/photo-1615461065929-4f8ffed6ca40?w=400",
             "{\"tags\":[\"헌혈\",\"의료\"],\"location\":\"서울 본사\",\"participants\":120}"},
        };

        for (Object[] row : data) {
            ActivityDto dto = new ActivityDto();
            dto.setTitle((String) row[0]);
            dto.setDescription((String) row[1]);
            dto.setImageUrl((String) row[2]);
            dto.setMetadata((String) row[3]);
            activityMapper.insert(dto);
        }
    }
}
