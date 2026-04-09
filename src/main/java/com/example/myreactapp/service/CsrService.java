package com.example.myreactapp.service;

import com.example.myreactapp.dto.*;
import com.example.myreactapp.mapper.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class CsrService {

    private final ActivityMapper activityMapper;
    private final CsrPaymentMapper csrPaymentMapper;
    private final DonationRecordMapper donationRecordMapper;
    private final VolunteerApplicationMapper volunteerApplicationMapper;

    public CsrService(ActivityMapper activityMapper,
                      CsrPaymentMapper csrPaymentMapper,
                      DonationRecordMapper donationRecordMapper,
                      VolunteerApplicationMapper volunteerApplicationMapper) {
        this.activityMapper = activityMapper;
        this.csrPaymentMapper = csrPaymentMapper;
        this.donationRecordMapper = donationRecordMapper;
        this.volunteerApplicationMapper = volunteerApplicationMapper;
    }

    // ── 통계 ────────────────────────────────────────────────
    public StatsResponse getStats() {
        BigDecimal total = csrPaymentMapper.sumTotalAmount();
        long totalDonation = (total != null) ? total.longValue() : 0L;
        long totalActivities = activityMapper.count();
        return new StatsResponse(totalDonation, totalActivities, 12500L, 3200L);
    }

    // ── 활동 ────────────────────────────────────────────────
    public List<ActivityDto> getRecentActivities(int limit) {
        return activityMapper.findRecentN(limit);
    }

    public ActivityDto getActivity(Long id) {
        return activityMapper.findById(id);
    }

    // ── 기부 집행 내역 ────────────────────────────────────────
    public List<CsrPaymentDto> getAllPayments() {
        return csrPaymentMapper.findAll();
    }

    // ── 기부 레코드 ──────────────────────────────────────────
    public List<DonationRecordDto> getAllDonations() {
        return donationRecordMapper.findAll();
    }

    // ── 봉사자 신청 ──────────────────────────────────────────
    @Transactional
    public void applyVolunteer(VolunteerApplicationDto dto) {
        if (dto.getAppliedAt() == null) {
            dto.setAppliedAt(LocalDateTime.now());
        }
        volunteerApplicationMapper.insert(dto);
    }
}
