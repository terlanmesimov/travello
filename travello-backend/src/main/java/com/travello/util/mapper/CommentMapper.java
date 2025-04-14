package com.travello.util.mapper;

import com.travello.dto.request.CommentRequestDTO;
import com.travello.dto.response.CommentResponseDTO;
import com.travello.entity.BlogComment;
import com.travello.entity.PlaceComment;
import com.travello.repository.BlogRepository;
import com.travello.repository.PlaceRepository;
import com.travello.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


@Component
public class CommentMapper {
    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private UserRepository userRepository;

    public BlogComment mapToBlogComment(CommentRequestDTO request) {
        BlogComment comment = new BlogComment();
        comment.setBlog(blogRepository.findById(request.getBlogId()).orElseThrow());
        comment.setUser(userRepository.findById(request.getUserId()).orElseThrow());
        comment.setText(request.getText());
        comment.setCreatedAt(LocalDateTime.now());
        return comment;
    }

    public PlaceComment mapToPlaceComment(CommentRequestDTO request) {
        PlaceComment comment = new PlaceComment();
        comment.setPlace(placeRepository.findById(request.getPlaceId()).orElseThrow());
        comment.setUser(userRepository.findById(request.getUserId()).orElseThrow());
        comment.setText(request.getText());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setRating(request.getRating());
        return comment;
    }

    public CommentResponseDTO mapToResponse(BlogComment comment) {
        CommentResponseDTO response = new CommentResponseDTO();
        response.setId(comment.getId());
        response.setText(comment.getText());
        response.setUserId(comment.getUser().getId());
        response.setBlogId(comment.getBlog().getId());
        return response;
    }

    public CommentResponseDTO mapToResponse(PlaceComment comment) {
        CommentResponseDTO response = new CommentResponseDTO();
        response.setId(comment.getId());
        response.setText(comment.getText());
        response.setRating(comment.getRating());
        response.setUserId(comment.getUser().getId());
        response.setPlaceId(comment.getPlace().getId());
        return response;
    }
}
