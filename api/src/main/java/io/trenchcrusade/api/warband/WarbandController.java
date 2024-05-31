package io.trenchcrusade.api.warband;

import io.trenchcrusade.api.rule.faction.FactionRepository;
import io.trenchcrusade.api.security.SessionService;
import io.trenchcrusade.api.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;

@Controller
@RequestMapping(path="/warband")
public class WarbandController {
    @Autowired
    private SessionService sessionService;

    @Autowired
    private WarbandRepository warbandRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Warband> all(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken) {
        UserDetailsImpl userDetails = sessionService.loadUserBy(authorizationToken);
        return warbandRepository.findAllByUser(userDetails.getUser());
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Warband get(@PathVariable("id") Long id) {
        Optional<Warband> warband = warbandRepository.findById(id);
        if (warband.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Warband " + id + "not found.");

        return warband.get();
    }

    @PostMapping("")
    public @ResponseBody Warband create(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                        @RequestBody WarbandDto warband) {
        UserDetailsImpl userDetails = sessionService.loadUserBy(authorizationToken);
        if (userDetails == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        warband.setUser(userDetails.getUser());
        warband.setDucats(700);
        warband.setGlory(0);
        warband.setName("New Warband");

        return warbandRepository.save(warband.build());
    }

    @DeleteMapping("/{id}")
    public @ResponseBody String delete(@PathVariable("id") Long id) {
        warbandRepository.deleteById(id);
        return String.valueOf(id);
    }

    @PatchMapping("/{id}")
    public @ResponseBody Warband patch(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                       @PathVariable("id") Long id,
                                       @RequestBody WarbandDto warbandDto) {
        Optional<Warband> warband = warbandRepository.findById(id);
        if (warband.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Warband " + id + "not found.");
        sessionService.authorizeUserBy(authorizationToken, warband.get());

        return warbandRepository.save(warbandDto.patch(warband.get()));
    }
}