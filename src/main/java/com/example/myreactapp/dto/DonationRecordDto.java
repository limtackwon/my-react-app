package com.example.myreactapp.dto;

import java.time.LocalDate;

public class DonationRecordDto {
    private Long id;
    private LocalDate date;
    private String recipient;
    private String category;
    private Long amount;
    private String status;

    public DonationRecordDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getRecipient() { return recipient; }
    public void setRecipient(String recipient) { this.recipient = recipient; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Long getAmount() { return amount; }
    public void setAmount(Long amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
