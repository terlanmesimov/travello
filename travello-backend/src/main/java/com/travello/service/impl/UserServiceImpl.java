package com.travello.service.impl;
import com.travello.dto.response.UserResponseDTO;
import com.travello.repository.UserRepository;
import com.travello.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserResponseDTO signUp(String email, String username, String password) {
        return null;
    }

    @Override
    public UserResponseDTO login(String email, String password) {
        return null;
    }

    @Override
    public boolean changeImage(String imageBase64) {
        return false;
    }

    @Override
    public boolean changePassword(String newPassword) {
        return false;
    }
}
