package com.travello.util.mapper;

import com.travello.dto.request.UserRequestDTO;
import com.travello.dto.response.UserResponseDTO;
import com.travello.entity.User;
import com.travello.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User mapToUser(UserRequestDTO userRequestDTO) {
        User user = new User();
        user.setEmail(userRequestDTO.getEmail());
        user.setUsername(userRequestDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        return user;
    }

    public UserResponseDTO mapToResponse(User user) {
        UserResponseDTO response = new UserResponseDTO();
        response.setEmail(user.getEmail());
        response.setUsername(user.getUsername());
        if (user.getImage() != null) {
            response.setImageBase64(ImageUtil.encodeImageToBase64String(user.getImage()));
        }
        return response;
    }
}
