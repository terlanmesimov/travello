package com.travello.util.mapper;

import com.travello.dto.request.BlogRequestDTO;
import com.travello.dto.response.BlogResponseDTO;
import com.travello.dto.response.CommentResponseDTO;
import com.travello.dto.response.PlaceResponseDTO;
import com.travello.entity.Blog;
import com.travello.entity.Place;
import com.travello.repository.PlaceRepository;
import com.travello.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class BlogMapper {

    private final PlaceRepository placeRepository;
    private final PlaceMapper placeMapper;
    private final CommentMapper commentMapper;

    public Blog mapToBlog(BlogRequestDTO request) {
        Blog blog = new Blog();
        blog.setName(request.getName());
        blog.setAuthor(request.getAuthor());
        blog.setDescription(request.getDescription());
        try {
            Map<String, String> image = ImageUtil.convertMultipartDataFileToBase64(request.getImage());
            blog.setImage(ImageUtil.decodeImageToBytes(image.get("base64String")));
            blog.setImageType(image.get("mimiType"));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Image Not Serializable");
        }
        blog.setCreatedAt(LocalDateTime.now());
        List<Place> places = new ArrayList<>();
        request.getPlaceIds().forEach(id -> places.add(placeRepository.findById(id).orElseThrow()));
        blog.setPlaces(places);
        return blog;
    }

    public BlogResponseDTO mapToResponse(Blog blog) {
        BlogResponseDTO response = new BlogResponseDTO();
        response.setId(blog.getId());
        response.setName(blog.getName());
        response.setAuthor(blog.getAuthor());
        response.setDescription(blog.getDescription());
        response.setImageBase64(ImageUtil.joinBase64(blog.getImageType(),
                ImageUtil.encodeImageToBase64String(blog.getImage())));
        response.setCreatedAt(blog.getCreatedAt());
        List<PlaceResponseDTO> places = new ArrayList<>();
        blog.getPlaces().forEach(place -> places.add(placeMapper.mapToResponse(place)));
        response.setPlaces(places);
        List<CommentResponseDTO> comments = new ArrayList<>();
        if (blog.getComments() != null) {
            blog.getComments().forEach(blogComment -> comments.add(commentMapper.mapToResponse(blogComment)));
        }
        response.setComments(comments);
        return response;
    }

    public List<BlogResponseDTO> mapToResponseDTOList(List<Blog> blogList) {
        List<BlogResponseDTO> response = new ArrayList<>();
        for (Blog blog : blogList) {
            response.add(mapToResponse(blog));
        }
        return response;
    }
}
