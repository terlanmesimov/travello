package com.travello.controller.impl;

import com.travello.controller.RestBlogController;
import com.travello.dto.request.BlogRequestDTO;
import com.travello.dto.request.CommentRequestDTO;
import com.travello.dto.response.BlogResponseDTO;
import com.travello.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rest/api/blog")
@CrossOrigin(origins = "http://localhost:3000")
public class RestBlogControllerImpl implements RestBlogController {

    private final BlogService blogService;

    @Override
    @PostMapping("/save")
    public ResponseEntity<BlogResponseDTO> saveBlog(@RequestBody BlogRequestDTO blogRequestDTO) {
        return blogService.saveBlog(blogRequestDTO);
    }

    @Override
    @GetMapping("/list")
    public ResponseEntity<List<BlogResponseDTO>> getBlogList() {
        return blogService.getBlogList();
    }

    @Override
    @GetMapping("/get/{id}")
    public ResponseEntity<BlogResponseDTO> getBlogById(@PathVariable Long id) {
        return blogService.getBlogById(id);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteBlog(@PathVariable Long id) {
        return blogService.deleteBlog(id);
    }

    @Override
    @PutMapping("/update/{id}")
    public ResponseEntity<BlogResponseDTO> updateBlog(@PathVariable Long id, @RequestBody BlogRequestDTO blogRequestDTO) {
        return blogService.updateBlog(id, blogRequestDTO);
    }

    @Override
    @PostMapping("/add-comment")
    public ResponseEntity<?> addComment(@RequestHeader String token, @RequestBody CommentRequestDTO commentRequestDTO) {
        return blogService.addComment(token, commentRequestDTO);
    }

    @Override
    @PutMapping("/edit-comment/{id}")
    public ResponseEntity<?> editComment(@RequestHeader String token,
                                         @PathVariable Long id,
                                         @RequestBody CommentRequestDTO commentRequestDTO) {
        return blogService.editComment(token, id, commentRequestDTO);
    }

    @Override
    @DeleteMapping("/delete-comment/{id}")
    public ResponseEntity<Boolean> deleteComment(@RequestHeader String token, @PathVariable Long id) {
        return blogService.deleteComment(token, id);
    }

}
