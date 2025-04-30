package com.travello.repository;

import com.travello.entity.PlaceComment;
import com.travello.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceCommentRepository extends JpaRepository<PlaceComment, Long> {
    List<PlaceComment> findPlaceCommentsByUser_Id(Long userId);
}
