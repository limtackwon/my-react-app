package com.example.myreactapp.mapper;

import com.example.myreactapp.dto.CsrPaymentDto;
import org.apache.ibatis.annotations.Mapper;

import java.math.BigDecimal;
import java.util.List;

@Mapper
public interface CsrPaymentMapper {

    List<CsrPaymentDto> findAll();

    BigDecimal sumTotalAmount();

    long count();

    void insert(CsrPaymentDto dto);
}
