package io.trenchcrusade.api.warband.troop;

import io.trenchcrusade.api.security.SessionService;
import io.trenchcrusade.api.warband.Warband;
import io.trenchcrusade.api.warband.WarbandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

@Controller
@RequestMapping(path="/warband/{warbandId}/troop")
public class TroopController {
    @Autowired
    private SessionService sessionService;

    @Autowired
    private TroopRepository troopRepository;

    @Autowired
    private WarbandRepository warbandRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Troop> all(@PathVariable Long warbandId) {
        return troopRepository.findAllByWarbandId(warbandId);
    }

    @PostMapping("")
    public @ResponseBody Troop create(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                      @RequestBody Troop troop,
                                      @PathVariable Long warbandId) {
        sessionService.authorizeUserBy(authorizationToken, warbandId);
        return troopRepository.save(troop);
    }

    @DeleteMapping("/{id}")
    public @ResponseBody String delete(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                       @PathVariable("warbandId") Long warbandId,
                                       @PathVariable("id") Long id) {
        sessionService.authorizeUserBy(authorizationToken, warbandId);
        troopRepository.deleteById(id);
        return String.valueOf(id);
    }
}