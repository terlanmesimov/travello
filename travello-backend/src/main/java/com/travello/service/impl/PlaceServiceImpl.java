package com.travello.service.impl;

import com.travello.dto.request.CommentRequestDTO;
import com.travello.dto.request.PlaceRequestDTO;
import com.travello.dto.response.CommentResponseDTO;
import com.travello.dto.response.PlaceResponseDTO;
import com.travello.entity.Place;
import com.travello.entity.PlaceComment;
import com.travello.entity.User;
import com.travello.repository.PlaceCommentRepository;
import com.travello.repository.PlaceRepository;
import com.travello.repository.UserRepository;
import com.travello.service.PlaceService;
import com.travello.util.auth.JwtService;
import com.travello.util.mapper.CommentMapper;
import com.travello.util.mapper.PlaceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PlaceServiceImpl implements PlaceService {

    private final PlaceRepository placeRepository;
    private final PlaceMapper placeMapper;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;
    private final PlaceCommentRepository placeCommentRepository;

    @Override
    public ResponseEntity<PlaceResponseDTO> savePlace(PlaceRequestDTO placeRequestDTO) {
        Place place = placeMapper.mapToPlace(placeRequestDTO);
        Place addedPlace = placeRepository.save(place);
        return ResponseEntity.ok(placeMapper.mapToResponse(addedPlace));
    }

    @Override
    public ResponseEntity<List<PlaceResponseDTO>> getPlaceList() {
        List<Place> placeList = placeRepository.findAll();
        return ResponseEntity.ok(placeMapper.mapToResponseDTOList(placeList));
    }

    @Override
    public ResponseEntity<PlaceResponseDTO> getPlaceById(Long id) {
        Place place = placeRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Place Not Found"));
        return ResponseEntity.ok(placeMapper.mapToResponse(place));
    }

    @Override
    public ResponseEntity<Boolean> deletePlace(Long id) {
        placeRepository.deleteById(id);
        return ResponseEntity.ok(!placeRepository.existsById(id));
    }

    @Override
    public ResponseEntity<PlaceResponseDTO> updatePlace(Long id, PlaceRequestDTO placeRequestDTO) {
        System.out.println(placeRequestDTO.getImage());
        Place place = placeMapper.mapToPlace(placeRequestDTO);
        place.setId(id);
        Place updatedPlace = placeRepository.save(place);
        return ResponseEntity.ok(placeMapper.mapToResponse(updatedPlace));
    }

    @Override
    public ResponseEntity<List<PlaceResponseDTO>> getFilteredPlaceList(Long regionId, Long categoryId, Double rating) {
        List<Place> placeList = placeRepository.findByFilters(regionId, categoryId, rating);
        return ResponseEntity.ok(placeMapper.mapToResponseDTOList(placeList));
    }

    @Override
    public ResponseEntity<List<PlaceResponseDTO>> searchByName(String placeName) {
        List<Place> placeList = placeRepository.searchByName(placeName);
        return ResponseEntity.ok(placeMapper.mapToResponseDTOList(placeList));
    }

    @Override
    public ResponseEntity<Boolean> addFavorites(String token, Long id) {
        boolean isValid = jwtService.isTokenValid(token);
        if (isValid) {
            Place place = placeRepository.findById(id).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "Place Not Found"));
            String username = jwtService.extractUsername(token);
            User user = userRepository.findUserByUsername(username).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
            );
            List<Place> favorites = user.getFavorites();
            favorites.add(place);
            user.setFavorites(favorites);
            User updatedUser = userRepository.save(user);
            if (updatedUser.getFavorites().getLast().equals(place)) {
                return ResponseEntity.ok(true);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
    }

    @Override
    public ResponseEntity<Boolean> deleteFavorites(String token, Long id) {
        boolean isValid = jwtService.isTokenValid(token);
        if (isValid) {
            Place place = placeRepository.findById(id).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "Place Not Found"));
            String username = jwtService.extractUsername(token);
            User user = userRepository.findUserByUsername(username).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
            );
            List<Place> favorites = user.getFavorites();
            boolean isDeleted = favorites.removeIf(favorite -> favorite.getId().equals(place.getId()));
            if (isDeleted) {
                user.setFavorites(favorites);
                userRepository.save(user);
                return ResponseEntity.ok(true);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
    }

    @Override
    public ResponseEntity<?> getFavorites(String token) {
        boolean isValid = jwtService.isTokenValid(token);
        if (isValid) {
            String username = jwtService.extractUsername(token);
            User user = userRepository.findUserByUsername(username).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
            );
            List<Place> placeList = userRepository.findUserByUsername(username).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")).getFavorites();
            List<PlaceResponseDTO> response = placeMapper.mapToResponseDTOList(placeList);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
    }

    @Override
    public ResponseEntity<?> addComment(String token, CommentRequestDTO commentRequestDTO) {
        boolean isValid = jwtService.isTokenValid(token);
        if (isValid) {
            String username = jwtService.extractUsername(token);
            User user = userRepository.findUserByUsername(username).orElseThrow(() ->
                    new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found")
            );
            PlaceComment placeComment = commentMapper.mapToPlaceComment(commentRequestDTO, user);
            PlaceComment updatedComment = placeCommentRepository.save(placeComment);
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
            PlaceComment placeComment = commentMapper.mapToPlaceComment(commentRequestDTO, user);
            placeComment.setId(id);
            PlaceComment updatedComment = placeCommentRepository.save(placeComment);
            CommentResponseDTO response = commentMapper.mapToResponse(updatedComment);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
    }

    @Override
    public ResponseEntity<Boolean> deleteComment(String token, Long id) {
        boolean isValid = jwtService.isTokenValid(token);
        if (isValid) {
            placeCommentRepository.deleteById(id);
            boolean isExists = placeCommentRepository.existsById(id);
            return ResponseEntity.ok(!isExists);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
    }
}
