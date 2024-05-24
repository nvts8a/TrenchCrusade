package io.trenchcrusade.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

@Component
public class SessionService {
    @Autowired
    private UserRepository userRepository;

    private final String PREFIX = "Bearer ";

    public String getEncodeUsername(String username) {
        return Base64.getEncoder().encodeToString(username.getBytes(StandardCharsets.UTF_8));
    }

    public String getAuthToken() {
        return PREFIX + UUID.randomUUID();
    }

    public UserDetails loadUserByToken(String authHeader) throws UsernameNotFoundException {
        if (!authHeader.startsWith(PREFIX)) return null;

        User user = userRepository.findByToken(authHeader);
        if (user == null) throw new UsernameNotFoundException("User not found");

        return new UserDetailsImpl(user);
    }
}
