package io.trenchcrusade.api.security;

import io.trenchcrusade.api.rule.faction.Faction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

@Controller
@RequestMapping(path="/login")
public class LoginController {
/*
    @Autowired
    private final AuthenticationManager authenticationManager;

    @Autowired
    private LoginRepository loginRepository;

    public LoginController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("")
    public @ResponseBody Login login(@RequestBody LoginRequest loginRequest) {
        Authentication authRequest  = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.username(), loginRequest.password());
        Authentication authResponse = authenticationManager.authenticate(authRequest);

        if (!authResponse.isAuthenticated()) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        return loginRepository.findByUsername(loginRequest.username());
    }

    public record LoginRequest(String username, String password) { }

 */
}