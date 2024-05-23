package io.trenchcrusade.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;
import java.util.UUID;

@Component
public class SessionService {
    @Autowired
    private UserRepository userRepository;

    public String getEncodeUsername(String username) {
        return Base64.getEncoder().encodeToString(username.getBytes(StandardCharsets.UTF_8));
    }

    public String getAuthToken() {
        return UUID.randomUUID().toString();
    }

    public UserDetails loadUserByToken(String authToken) throws UsernameNotFoundException {



        //String username = new String(Base64.getDecoder().decode(authToken));
        User user = userRepository.findByToken(authToken);
        if (user == null) throw new UsernameNotFoundException("User not found");

        return new UserDetailsImpl(user);
    }
}
