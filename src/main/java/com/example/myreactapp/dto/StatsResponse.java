package com.example.myreactapp.dto;

public record StatsResponse(
        Long totalDonation,
        Long totalActivities,
        Long volunteers,
        Long childrenSupported
) {}
