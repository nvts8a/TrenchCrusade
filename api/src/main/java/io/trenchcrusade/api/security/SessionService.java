package io.trenchcrusade.api.security;

import io.trenchcrusade.api.warband.Warband;
import io.trenchcrusade.api.warband.WarbandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Component
public class SessionService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WarbandRepository warbandRepository;

    private final String PREFIX = "Bearer ";

    public String getEncodeUsername(String username) {
        return Base64.getEncoder().encodeToString(username.getBytes(StandardCharsets.UTF_8));
    }

    public String getAuthToken() {
        return PREFIX + UUID.randomUUID();
    }

    public UserDetailsImpl loadUserBy(String authHeader) throws UsernameNotFoundException {
        if (!authHeader.startsWith(PREFIX)) return null;

        User user = userRepository.findByToken(authHeader);
        if (user == null) return null;
        return new UserDetailsImpl(user);
    }

    public void authorizeUserBy(String authorizationToken, Long warbandId) throws ResponseStatusException {
        Optional<Warband> warband = warbandRepository.findById(warbandId);
        if (warband.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Warband " + warbandId + "not found.");
        authorizeUserBy(authorizationToken, warband.get());
    }

    public void authorizeUserBy(String authorizationToken, Warband warband) throws ResponseStatusException {
        UserDetailsImpl userDetails = loadUserBy(authorizationToken);
        if (!userDetails.getUser().getId().equals(warband.getUser().getId()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }
}
