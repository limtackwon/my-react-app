package com.example.myreactapp.mapper;

import com.example.myreactapp.dto.VolunteerApplicationDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface VolunteerApplicationMapper {

    void insert(VolunteerApplicationDto dto);
}
