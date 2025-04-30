package com.travello.controller;

import com.travello.dto.request.BlogRequestDTO;
import com.travello.dto.request.CommentRequestDTO;
import com.travello.dto.response.BlogResponseDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RestBlogController {
    ResponseEntity<BlogResponseDTO> saveBlog (BlogRequestDTO blogRequestDTO);
    ResponseEntity<List<BlogResponseDTO>> getBlogList();
    ResponseEntity<BlogResponseDTO> getBlogById (Long id);
    ResponseEntity<Boolean> deleteBlog (Long id);
    ResponseEntity<BlogResponseDTO> updateBlog (Long id, BlogRequestDTO blogRequestDTO);
    ResponseEntity<?> addComment(String token, CommentRequestDTO commentRequestDTO);
    ResponseEntity<?> editComment(String token, Long id, CommentRequestDTO commentRequestDTO);
    ResponseEntity<Boolean> deleteComment(String token, Long id);
}
