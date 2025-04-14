package com.travello.service.impl;

import com.travello.dto.request.CommentRequestDTO;
import com.travello.dto.response.CommentResponseDTO;
import com.travello.entity.BlogComment;
import com.travello.entity.PlaceComment;
import com.travello.repository.BlogCommentRepository;
import com.travello.repository.CommentRepository;
import com.travello.repository.PlaceCommentRepository;
import com.travello.service.CommentService;
import com.travello.util.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CommentMapper commentMapper;
    @Autowired
    private PlaceCommentRepository placeCommentRepository;
    @Autowired
    private BlogCommentRepository blogCommentRepository;

    @Override
    public CommentResponseDTO addComment(CommentRequestDTO commentRequestDTO) {
        CommentResponseDTO response = new CommentResponseDTO();
        if (commentRequestDTO.getBlogId() != null) {
            BlogComment blogComment = blogCommentRepository.save(commentMapper.mapToBlogComment(commentRequestDTO));
            response = commentMapper.mapToResponse(blogComment);
        }
        if (commentRequestDTO.getPlaceId() != null) {
            PlaceComment placeComment = placeCommentRepository.save(commentMapper.mapToPlaceComment(commentRequestDTO));
            response = commentMapper.mapToResponse(placeComment);
        }
        return response;
    }

    @Override
    public CommentResponseDTO getCommentById(Long id) {
        CommentResponseDTO response = new CommentResponseDTO();
        if (blogCommentRepository.existsById(id)) {
            response = commentMapper.mapToResponse(blogCommentRepository.getReferenceById(id));
        }
        if (placeCommentRepository.existsById(id)) {
            response = commentMapper.mapToResponse(placeCommentRepository.getReferenceById(id));
        }
        return response;
    }

    @Override
    public List<CommentResponseDTO> getCommentList(Long userId) {
        List<CommentResponseDTO> response = new ArrayList<>();
        List<BlogComment> blogComments = blogCommentRepository.findBlogCommentsByUser_Id(userId);
        blogComments.forEach(blogComment -> response.add(commentMapper.mapToResponse(blogComment)));
        List<PlaceComment> placeComments = placeCommentRepository.findPlaceCommentsByUser_Id(userId);
        placeComments.forEach(placeComment -> response.add(commentMapper.mapToResponse(placeComment)));
        return response;
    }

    @Override
    public CommentResponseDTO updateComment(Long id, CommentRequestDTO commentRequestDTO) {
        CommentResponseDTO response = new CommentResponseDTO();
        if (commentRequestDTO.getBlogId() != null) {
            BlogComment comment = commentMapper.mapToBlogComment(commentRequestDTO);
            comment.setId(id);
            BlogComment blogComment = blogCommentRepository.save(comment);
            response = commentMapper.mapToResponse(blogComment);
        }
        if (commentRequestDTO.getPlaceId() != null) {
            PlaceComment comment = commentMapper.mapToPlaceComment(commentRequestDTO);
            comment.setId(id);
            PlaceComment placeComment = placeCommentRepository.save(comment);
            response = commentMapper.mapToResponse(placeComment);
        }
        return response;
    }

    @Override
    public boolean deleteComment(Long id) {
        commentRepository.deleteById(id);
        return !commentRepository.existsById(id);
    }
}
