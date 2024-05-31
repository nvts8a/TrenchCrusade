package io.trenchcrusade.api.warband.troop;

import io.trenchcrusade.api.security.SessionService;
import io.trenchcrusade.api.warband.Warband;
import io.trenchcrusade.api.warband.WarbandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public @ResponseBody Iterable<Troop> all(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                             @PathVariable Long warbandId) {
        Warband warband = sessionService.authorizeUserFor(authorizationToken, warbandId);
        return troopRepository.findAllByWarband(warband);
    }

    @PostMapping("")
    public @ResponseBody Troop create(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                      @RequestBody Troop troop,
                                      @PathVariable Long warbandId) {
        Warband warband = sessionService.authorizeUserFor(authorizationToken, warbandId);
        troop.setWarband(warband);

        return troopRepository.save(troop);
    }

    @DeleteMapping("/{id}")
    public @ResponseBody String delete(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                       @PathVariable("warbandId") Long warbandId,
                                       @PathVariable("id") Long id) {
        sessionService.authorizeUserFor(authorizationToken, warbandId);
        troopRepository.deleteById(id);
        return String.valueOf(id);
    }
}