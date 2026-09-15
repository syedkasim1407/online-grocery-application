package com.onlinegrocery.backend.service;

import java.util.ArrayList;
import java.util.List;


import org.springframework.stereotype.Service;

import com.onlinegrocery.backend.dto.LoginRequestDTO;
import com.onlinegrocery.backend.dto.LoginResponseDTO;
import com.onlinegrocery.backend.dto.UserRegisterDTO;
import com.onlinegrocery.backend.dto.UserResponseDTO;
import com.onlinegrocery.backend.enums.Role;
import com.onlinegrocery.backend.model.User;
import com.onlinegrocery.backend.repository.UserRepository;
import com.onlinegrocery.backend.security.JwtUtil;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserServiceImpl(UserRepository userRepository,JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO request)
    {
        User user=userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        
        if(!user.getPassword().equals(request.getPassword()))
        {
            throw new RuntimeException("Invalid email or password");
        }

        String token=jwtUtil
            .generateToken(user.getEmail(),user.getId(),user.getRole().name());

        return LoginResponseDTO.builder()
            .token(token)
            .email(user.getEmail())
            .role(user.getRole().name())
            .build();

    }

    @Override
    public UserResponseDTO createUser(UserRegisterDTO request)
    {
        User user = User.builder()
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .email(request.getEmail())
            .password(request.getPassword())
            .phone(request.getPhone())
            .address(request.getAddress())
            .city(request.getCity())
            .state(request.getState())  
            .pincode(request.getPincode())
            .enabled(request.isEnabled())
            .role(request.getRole())
            .build();
        User savedUser = userRepository.save(user);
        return UserResponseDTO.builder()
            .firstName(savedUser.getFirstName())
            .lastName(savedUser.getLastName())
            .email(savedUser.getEmail())
            .phone(savedUser.getPhone())
            .address(savedUser.getAddress())
            .city(savedUser.getCity())
            .state(savedUser.getState())  
            .pincode(savedUser.getPincode())
            .enabled(savedUser.isEnabled())
            .role(savedUser.getRole().name())
            
            .build();
    }

    @Override
    public List<UserResponseDTO> getAllUsers()
    {
        List<User> user= userRepository.findAll();
        List<UserResponseDTO> response=new ArrayList<>();

        for(User u:user)
        {
            UserResponseDTO savedUser=UserResponseDTO.builder()
                        .firstName(u.getFirstName())
                        .lastName(u.getLastName())
                        .email(u.getEmail())
                        .phone(u.getPhone())
                        .address(u.getAddress())
                        .city(u.getCity())
                        .state(u.getState())  
                        .pincode(u.getPincode())    
                        .enabled(u.isEnabled())
                        .role(u.getRole().name())
                        
                        .build();
            response.add(savedUser);
        }
        return response;
    }

    @Override
    public UserResponseDTO getUserById(Long id)
    {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        UserResponseDTO response=UserResponseDTO.builder()
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .address(user.getAddress())
                        .city(user.getCity())
                        .state(user.getState())  
                        .pincode(user.getPincode())    
                        .enabled(user.isEnabled())
                        .role(user.getRole().name())
                        
                        .build();
        
        return response; 
    }


    @Override
    public UserResponseDTO updateUser(Long id,UserRegisterDTO request)
    {
        User existingUser= userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        existingUser.setFirstName(request.getFirstName());
        existingUser.setLastName(request.getLastName());
        existingUser.setEmail(request.getEmail());
        existingUser.setPassword(request.getPassword());
        existingUser.setPhone(request.getPhone());
        existingUser.setAddress(request.getAddress());
        existingUser.setCity(request.getCity());
        existingUser.setState(request.getState());
        existingUser.setPincode(request.getPincode());
        existingUser.setEnabled(request.isEnabled());
        existingUser.setRole(request.getRole());

        User savedUser= userRepository.save(existingUser);

        UserResponseDTO response=UserResponseDTO.builder()
                        .firstName(savedUser.getFirstName())
                        .lastName(savedUser.getLastName())
                        .email(savedUser.getEmail())
                        .phone(savedUser.getPhone())
                        .address(savedUser.getAddress())
                        .city(savedUser.getCity())
                        .state(savedUser.getState())  
                        .pincode(savedUser.getPincode())    
                        .enabled(savedUser.isEnabled())
                        .role(savedUser.getRole().name())
                        
                        .build();
        return response;
    }

    @Override
    public void deleteUser(Long id)
    {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        userRepository.delete(user);
        
    }


}
