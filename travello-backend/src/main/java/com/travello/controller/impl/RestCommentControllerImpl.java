package com.travello.controller.impl;

import com.travello.controller.RestCommentController;
import com.travello.dto.request.CommentRequestDTO;
import com.travello.dto.response.CommentResponseDTO;
import com.travello.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/api/comment")
@CrossOrigin(origins = "http://localhost:3000")
public class RestCommentControllerImpl implements RestCommentController {
    @Autowired
    private CommentService commentService;

    @Override
    @PostMapping("/add")
    public CommentResponseDTO addComment(@RequestBody CommentRequestDTO commentRequestDTO) {
        return commentService.addComment(commentRequestDTO);
    }

    @Override
    @GetMapping("/get-by-id/{id}")
    public CommentResponseDTO getCommentById(@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    @Override
    @GetMapping("/list/{userId}")
    public List<CommentResponseDTO> getCommentList(@PathVariable Long userId) {
        return commentService.getCommentList(userId);
    }

    @Override
    @PutMapping("/uptade/{id}")
    public CommentResponseDTO updateComment(@PathVariable Long id, @RequestBody CommentRequestDTO commentRequestDTO) {
        return commentService.updateComment(id, commentRequestDTO);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public boolean deleteComment(@PathVariable Long id) {
        return commentService.deleteComment(id);
    }
}
