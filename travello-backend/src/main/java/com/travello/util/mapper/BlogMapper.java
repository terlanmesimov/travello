package com.travello.util.mapper;

import com.travello.dto.request.BlogRequestDTO;
import com.travello.dto.response.BlogResponseDTO;
import com.travello.dto.response.PlaceResponseDTO;
import com.travello.entity.Blog;
import com.travello.entity.Place;
import com.travello.repository.PlaceRepository;
import com.travello.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BlogMapper {
    @Autowired
    private PlaceRepository placeRepository;
    @Autowired
    private PlaceMapper placeMapper;

    public Blog mapToBlog(BlogRequestDTO request) {
        Blog blog = new Blog();
        blog.setName(request.getName());
        blog.setAuthor(request.getAuthor());
        blog.setDescription(request.getDescription());
        blog.setImage(ImageUtil.decodeImageToBytes(request.getImageBase64()));
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
        response.setImageBase64(ImageUtil.encodeImageToBase64String(blog.getImage()));
        List<PlaceResponseDTO> places = new ArrayList<>();
        blog.getPlaces().forEach(place -> places.add(placeMapper.mapToResponse(place)));
        response.setPlaces(places);
        return response;
    }
}
