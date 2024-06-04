package io.trenchcrusade.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@Controller
@RequestMapping(path="/user")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("")
    public ResponseEntity<User> create(@RequestBody User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setToken(sessionService.getAuthToken());

        userRepository.save(user);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", user.getToken());
        return ResponseEntity.ok().headers(headers).body(user);
    }

    @PutMapping("")
    public ResponseEntity<User>  login(@RequestBody User login) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword());

        Authentication authentication = authenticationManager.authenticate(token);
        if (!authentication.isAuthenticated()) return ResponseEntity.badRequest().body(login);

        User user = userRepository.findByUsername(login.getUsername());
        if (user == null) return ResponseEntity.badRequest().body(login);

        user.setToken(sessionService.getAuthToken());
        userRepository.save(user);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", user.getToken());
        return ResponseEntity.ok().headers(headers).body(user);
    }
}
