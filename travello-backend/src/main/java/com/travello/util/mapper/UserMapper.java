package com.travello.util.mapper;

import com.travello.dto.request.UserRequestDTO;
import com.travello.dto.response.UserResponseDTO;
import com.travello.entity.User;
import com.travello.util.ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Component
public class UserMapper {

    private final PasswordEncoder passwordEncoder;

    public User mapToUser(UserRequestDTO request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return user;
    }

    public UserResponseDTO mapToResponse(User user) {
        UserResponseDTO response = new UserResponseDTO();
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        if (user.getImage() != null) {
            response.setProfilePictureBase64(ImageUtil.encodeImageToBase64String(user.getImage()));
        }
        List<Long> comments = new ArrayList<>();
        user.getComments().forEach((comment) -> comments.add(comment.getId()));
        response.setCommentIds(comments);
        List<Long> favorites = new ArrayList<>();
        user.getFavorites().forEach((place) -> favorites.add(place.getId()));
        response.setFavoritePlaceIds(favorites);
        return response;
    }
}
