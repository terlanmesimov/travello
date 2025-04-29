package com.travello.repository;

import com.travello.entity.PlaceComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceCommentRepository extends JpaRepository<PlaceComment, Long> {
}
