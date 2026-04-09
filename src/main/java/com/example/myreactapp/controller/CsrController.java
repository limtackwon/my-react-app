package com.example.myreactapp.controller;

import com.example.myreactapp.dto.*;
import com.example.myreactapp.service.CsrService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * /api/csr/* — 보조 CSR API (기부 레코드, 봉사 신청)
 */
@RestController
@RequestMapping("/api/csr")
public class CsrController {

    private final CsrService csrService;

    public CsrController(CsrService csrService) {
        this.csrService = csrService;
    }

    @GetMapping("/donations")
    public ResponseEntity<List<DonationRecordDto>> getDonations() {
        return ResponseEntity.ok(csrService.getAllDonations());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        StatsResponse stats = csrService.getStats();
        return ResponseEntity.ok(Map.of(
                "totalDonation",    stats.totalDonation(),
                "volunteers",       stats.volunteers(),
                "childrenSupported",stats.childrenSupported()
        ));
    }

    @PostMapping("/volunteer")
    public ResponseEntity<Map<String, String>> applyVolunteer(
            @Valid @RequestBody VolunteerApplicationDto dto) {
        csrService.applyVolunteer(dto);
        return ResponseEntity.ok(Map.of("message", "봉사 신청이 완료되었습니다."));
    }
}
