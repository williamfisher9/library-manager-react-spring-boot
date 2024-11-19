package com.apps.library.manager.service;

import com.apps.library.manager.dao.MenuRepository;
import com.apps.library.manager.dao.RoleRepository;
import com.apps.library.manager.dao.UserRepository;
import com.apps.library.manager.dto.UserDTO;
import com.apps.library.manager.exceptions.AuthorizationHeaderNotFoundException;
import com.apps.library.manager.exceptions.RoleNotFoundException;
import com.apps.library.manager.model.app.Menu;
import com.apps.library.manager.model.security.Role;
import com.apps.library.manager.model.security.User;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.*;

@Component
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final MenuRepository menuRepository;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, ModelMapper modelMapper, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, MenuRepository menuRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.menuRepository = menuRepository;
    }

    @Override
    public User createUser(UserDTO userDTO) {
        Set<Role> roleSet = new HashSet<>();
        for(String val : userDTO.getRoles()){
            Role role = roleRepository.findByName(val)
                    .orElseThrow(() -> new RoleNotFoundException("Role was not found"));
            roleSet.add(role);
        }

        User user = modelMapper.map(userDTO, User.class);
        user.setRoles(roleSet);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(true);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);
        return userRepository.save(user);
    }

    @Override
    public Authentication authenticateUser(HttpServletRequest request) {
        String header;
        if(request.getHeader("Authorization") != null) {
            header = request.getHeader("Authorization").substring("Basic ".length());
        }
        else
            throw new AuthorizationHeaderNotFoundException("Authorization header was not found.");

        String decodedHeaderVal = new String(Base64.getDecoder().decode(header), StandardCharsets.UTF_8);

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(decodedHeaderVal.split(":")[0],
                        decodedHeaderVal.split(":")[1]);

        return authenticationManager.authenticate(usernamePasswordAuthenticationToken);
    }

    @Override
    public List<Menu> getMenu(String type) {
        return menuRepository.findByRole(type);
    }
}
