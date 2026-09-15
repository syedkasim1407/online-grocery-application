package com.onlinegrocery.backend.service;

import java.util.List;

import com.onlinegrocery.backend.dto.LoginRequestDTO;
import com.onlinegrocery.backend.dto.LoginResponseDTO;
import com.onlinegrocery.backend.dto.UserRegisterDTO;
import com.onlinegrocery.backend.dto.UserResponseDTO;
import com.onlinegrocery.backend.model.User;

public interface UserService {
    LoginResponseDTO login(LoginRequestDTO request);
    UserResponseDTO createUser(UserRegisterDTO request);
    List<UserResponseDTO> getAllUsers();
    UserResponseDTO getUserById(Long id);
    UserResponseDTO updateUser(Long id,UserRegisterDTO request);
    void deleteUser(Long id);
}
