package com.travello.repository;

import com.travello.entity.BlogComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogCommentRepository extends JpaRepository<BlogComment, Long> {
    List<BlogComment> findBlogCommentsByUser_Id(Long userId);
}
