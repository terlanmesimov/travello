package com.travello.controller;

import com.travello.dto.request.CommentRequestDTO;
import com.travello.dto.response.CommentResponseDTO;

import java.util.List;

public interface RestCommentController {
    CommentResponseDTO addComment (CommentRequestDTO commentRequestDTO);
    CommentResponseDTO getCommentById (Long id);
    List<CommentResponseDTO> getCommentList (Long userId);
    CommentResponseDTO updateComment (Long id , CommentRequestDTO commentRequestDTO);
    boolean deleteComment (Long id);
}
