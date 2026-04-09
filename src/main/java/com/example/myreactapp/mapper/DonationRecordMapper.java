package com.example.myreactapp.mapper;

import com.example.myreactapp.dto.DonationRecordDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DonationRecordMapper {

    List<DonationRecordDto> findAll();

    long count();

    void insert(DonationRecordDto dto);
}
