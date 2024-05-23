package io.trenchcrusade.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public @ResponseBody User create(@RequestBody User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        userRepository.save(user);

        return user;
    }

    @PatchMapping("")
    public ResponseEntity<User>  login(@RequestBody User login) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword());

        Authentication authentication = authenticationManager.authenticate(token);
        if (!authentication.isAuthenticated()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        User user = userRepository.findByUsername(login.getUsername());
        if (user == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        user.setToken(sessionService.getAuthToken());
        userRepository.save(user);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", user.getToken());

        return ResponseEntity.ok().headers(headers).body(user);
    }
}
