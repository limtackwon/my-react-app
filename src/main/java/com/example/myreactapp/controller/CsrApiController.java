package com.example.myreactapp.controller;

import com.example.myreactapp.dto.*;
import com.example.myreactapp.service.CsrService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * /api/v1/* — 메인 CSR API
 */
@RestController
@RequestMapping("/api/v1")
public class CsrApiController {

    private final CsrService csrService;

    public CsrApiController(CsrService csrService) {
        this.csrService = csrService;
    }

    @GetMapping("/stats")
    public ResponseEntity<StatsResponse> getStats() {
        return ResponseEntity.ok(csrService.getStats());
    }

    @GetMapping("/activities")
    public ResponseEntity<List<ActivityDto>> getActivities(
            @RequestParam(defaultValue = "3") int limit) {
        return ResponseEntity.ok(csrService.getRecentActivities(limit));
    }

    @GetMapping("/activities/{id}")
    public ResponseEntity<ActivityDto> getActivity(@PathVariable Long id) {
        ActivityDto dto = csrService.getActivity(id);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/payments")
    public ResponseEntity<List<CsrPaymentDto>> getPayments() {
        return ResponseEntity.ok(csrService.getAllPayments());
    }
}
