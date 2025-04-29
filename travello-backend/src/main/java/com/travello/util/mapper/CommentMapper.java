package com.travello.util.mapper;

import com.travello.dto.request.CommentRequestDTO;
import com.travello.dto.response.CommentResponseDTO;
import com.travello.entity.*;
import com.travello.repository.BlogRepository;
import com.travello.repository.PlaceRepository;
import com.travello.repository.UserRepository;
import com.travello.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Component
public class CommentMapper {

    private final BlogRepository blogRepository;
    private final PlaceRepository placeRepository;
    private final UserRepository userRepository;

    public BlogComment mapToBlogComment(CommentRequestDTO request) {
        BlogComment comment = new BlogComment();
        Blog blog = blogRepository.findById(request.getBlogId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog Not Found"));
        comment.setBlog(blog);
        comment.setText(request.getText());
        comment.setCreatedAt(LocalDateTime.now());
        return comment;
    }

    public PlaceComment mapToPlaceComment(CommentRequestDTO request, User user) {
        PlaceComment comment = new PlaceComment();
        Place place = placeRepository.findById(request.getPlaceId()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Place Not Found"));
        comment.setUser(user);
        comment.setPlace(place);
        comment.setText(request.getText());
        comment.setCreatedAt(LocalDateTime.now());
        comment.setRating(request.getRating());
        return comment;
    }

    public CommentResponseDTO mapToResponse(BlogComment comment) {
        CommentResponseDTO response = new CommentResponseDTO();
        response.setId(comment.getId());
        response.setUsername(comment.getUser().getUsername());
        response.setText(comment.getText());
        response.setBlogId(comment.getBlog().getId());
        response.setCreatedAt(comment.getCreatedAt());
        return response;
    }

    public CommentResponseDTO mapToResponse(PlaceComment comment) {
        CommentResponseDTO response = new CommentResponseDTO();
        response.setId(comment.getId());
        response.setUsername(comment.getUser().getUsername());
        response.setText(comment.getText());
        response.setRating(comment.getRating());
        response.setPlaceId(comment.getPlace().getId());
        response.setCreatedAt(comment.getCreatedAt());
        if (comment.getUser().getImage() != null) {
            String profilePicture = ImageUtil.joinBase64(comment.getUser().getImageType(),
                    ImageUtil.encodeImageToBase64String(comment.getUser().getImage()));
            response.setProfilePictureBase64(profilePicture);
        }
        return response;
    }
}
