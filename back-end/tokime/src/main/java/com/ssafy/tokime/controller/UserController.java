package com.ssafy.tokime.controller;

import com.ssafy.tokime.dto.UserDTO;
import com.ssafy.tokime.model.User;
import com.ssafy.tokime.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController{
    private static final Logger logger = LoggerFactory.getLogger(ParentController.class);
    private final UserService userService;
}