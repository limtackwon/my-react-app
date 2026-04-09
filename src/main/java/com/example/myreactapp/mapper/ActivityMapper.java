package com.example.myreactapp.mapper;

import com.example.myreactapp.dto.ActivityDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ActivityMapper {

    List<ActivityDto> findAll();

    List<ActivityDto> findRecentN(@Param("limit") int limit);

    ActivityDto findById(@Param("id") Long id);

    long count();

    void insert(ActivityDto dto);
}
