package io.trenchcrusade.api.warband;

import io.trenchcrusade.api.rule.faction.Faction;
import io.trenchcrusade.api.security.SessionService;
import io.trenchcrusade.api.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(path="/warband")
public class WarbandController {
    @Autowired
    private SessionService sessionService;

    @Autowired
    private WarbandRepository warbandRepository;

    @GetMapping(path="/all")
    public @ResponseBody Map<Long, Warband> all(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken) {
        Map<Long, Warband> response = new HashMap<>();
        UserDetailsImpl userDetails = sessionService.loadUserBy(authorizationToken);
        warbandRepository.findAllByUser(userDetails.getUser()).forEach(record -> response.put(record.getId(), record));

        return response;
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Warband get(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                     @PathVariable("id") Long id) {
        return sessionService.authorizeUserForWarband(authorizationToken, id);
    }

    @PostMapping("")
    public @ResponseBody Warband create(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                        @RequestBody WarbandDto warband) {
        UserDetailsImpl userDetails = sessionService.loadUserBy(authorizationToken);
        if (userDetails == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        warband.setUser(userDetails.getUser());
        warband.setDucats(700);
        warband.setGlory(0);

        return warbandRepository.save(warband.build());
    }

    @DeleteMapping("/{id}")
    public @ResponseBody String delete(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                       @PathVariable("id") Long id) {
        Warband warband = sessionService.authorizeUserForWarband(authorizationToken, id);
        warbandRepository.deleteById(warband.getId());

        return String.valueOf(id);
    }

    @PutMapping("/{id}")
    public @ResponseBody Warband patch(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                       @PathVariable("id") Long id,
                                       @RequestBody WarbandDto warbandDto) {
        Warband warband = sessionService.authorizeUserForWarband(authorizationToken, id);
        return warbandRepository.save(warbandDto.patch(warband));
    }
}