package com.travello.service.impl;

import com.travello.dto.request.BlogRequestDTO;
import com.travello.dto.request.CommentRequestDTO;
import com.travello.dto.response.BlogResponseDTO;
import com.travello.dto.response.CommentResponseDTO;
import com.travello.entity.Blog;
import com.travello.entity.BlogComment;
import com.travello.entity.User;
import com.travello.repository.BlogCommentRepository;
import com.travello.repository.BlogRepository;
import com.travello.repository.UserRepository;
import com.travello.service.BlogService;
import com.travello.util.auth.JwtService;
import com.travello.util.mapper.BlogMapper;
import com.travello.util.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final BlogMapper blogMapper;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;
    private final BlogCommentRepository blogCommentRepository;

    @Override
    public ResponseEntity<BlogResponseDTO> saveBlog(BlogRequestDTO blogRequestDTO) {
        Blog blog = blogRepository.save(blogMapper.mapToBlog(blogRequestDTO));
        BlogResponseDTO response = blogMapper.mapToResponse(blog);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<List<BlogResponseDTO>> getBlogList() {
        List<Blog> blogs = blogRepository.findAll();
        List<BlogResponseDTO> response = blogMapper.mapToResponseDTOList(blogs);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<BlogResponseDTO> getBlogById(Long id) {
        Blog blog = blogRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Blog Not Found"));
        BlogResponseDTO response = blogMapper.mapToResponse(blog);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Boolean> deleteBlog(Long id) {
        blogRepository.deleteById(id);
        boolean isExists = blogRepository.existsById(id);
        return ResponseEntity.ok(!isExists);
    }

    @Override
    public ResponseEntity<BlogResponseDTO> updateBlog(Long id, BlogRequestDTO blogRequestDTO) {
        Blog blog = blogMapper.mapToBlog(blogRequestDTO);
        blog.setId(id);
        BlogResponseDTO response = blogMapper.mapToResponse(blogRepository.save(blog));
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> addComment(String token, CommentRequestDTO commentRequestDTO) {
        boolean isValid = jwtService.isTokenValid(token);
        if (isValid) {
            String username = jwtService.extractUsername(token);
            User user = userRepository.findUserByUsername(username).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
            );
            BlogComment blogComment = commentMapper.mapToBlogComment(commentRequestDTO, user);
            BlogComment updatedComment = blogCommentRepository.save(blogComment);
            CommentResponseDTO response = commentMapper.mapToResponse(updatedComment);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
    }

    @Override
    public ResponseEntity<?> editComment(String token, Long id, CommentRequestDTO commentRequestDTO) {
        boolean isValid = jwtService.isTokenValid(token);
        if (isValid) {
            String username = jwtService.extractUsername(token);
            User user = userRepository.findUserByUsername(username).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
            );
            BlogComment blogComment = commentMapper.mapToBlogComment(commentRequestDTO, user);
            blogComment.setId(id);
            BlogComment updatedComment = blogCommentRepository.save(blogComment);
            CommentResponseDTO response = commentMapper.mapToResponse(updatedComment);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
    }

    @Override
    public ResponseEntity<Boolean> deleteComment(String token, Long id) {
        boolean isValid = jwtService.isTokenValid(token);
        if (isValid) {
            blogCommentRepository.deleteById(id);
            boolean isExists = blogCommentRepository.existsById(id);
            return ResponseEntity.ok(!isExists);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
    }
}
