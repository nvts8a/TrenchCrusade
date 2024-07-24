package io.trenchcrusade.api.security;

import io.trenchcrusade.api.warband.Warband;
import io.trenchcrusade.api.warband.WarbandRepository;
import io.trenchcrusade.api.warband.troop.Troop;
import io.trenchcrusade.api.warband.troop.TroopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.util.*;

@Component
public class SessionService {
    // TODO: Make this some sort of user db property
    static final List<String> CMS_USERS = Arrays.asList("nvts8a", "nevets138");

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WarbandRepository warbandRepository;

    @Autowired
    private TroopRepository troopRepository;

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

    public void authorizeUserForCms(String authorizationToken) throws ResponseStatusException {
        UserDetailsImpl userDetails = loadUserBy(authorizationToken);
        if (!CMS_USERS.contains(userDetails.getUser().getUsername()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    public Warband authorizeUserForWarband(String authorizationToken, Long warbandId) throws ResponseStatusException {
        Optional<Warband> warband = warbandRepository.findById(warbandId);
        if (warband.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Warband " + warbandId + "not found.");

        UserDetailsImpl userDetails = loadUserBy(authorizationToken);
        if (!userDetails.getUser().getId().equals(warband.get().getUserId()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);

        return warband.get();
    }

    public Troop authorizeUserForTroop(Long troopId, Warband warband) {
        List<Troop> troop = troopRepository.findByIdAndWarband(troopId, warband);
        if (troop.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Troop " + troopId + "not found.");

        if (!troop.getFirst().getWarbandId().equals(warband.getId())) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);

        return troop.getFirst();
    }
}
