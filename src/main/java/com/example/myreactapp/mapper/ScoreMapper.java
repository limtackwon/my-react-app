package com.example.myreactapp.mapper;

import com.example.myreactapp.dto.ScoreDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ScoreMapper {

    /** Top-N high scores ordered by score DESC */
    List<ScoreDto> findTopScores(@Param("limit") int limit);

    /** Find existing entry by username (case-insensitive) */
    ScoreDto findByUsername(@Param("username") String username);

    /** Find existing entry by IP address */
    ScoreDto findByIpAddress(@Param("ipAddress") String ipAddress);

    /** Insert a new score record */
    void insert(ScoreDto score);

    /** Update score (and played_at) for an existing record */
    void update(ScoreDto score);
}
