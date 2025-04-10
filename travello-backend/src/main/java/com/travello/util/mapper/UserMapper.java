package com.travello.util.mapper;

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

    public User mapToUser(String email, String username, String password) {
        User user = new User();
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        return user;
    }

    public UserResponseDTO mapToResponse(User user) {
        UserResponseDTO response = new UserResponseDTO();
        response.setEmail(user.getEmail());
        response.setUsername(user.getUsername());
        response.setImageBase64(ImageUtil.encodeImageToBase64String(user.getImage()));
        return response;
    }
}
