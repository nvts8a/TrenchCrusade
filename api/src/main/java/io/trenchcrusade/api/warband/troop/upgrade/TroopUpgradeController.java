package io.trenchcrusade.api.warband.troop.upgrade;

import io.trenchcrusade.api.security.SessionService;
import io.trenchcrusade.api.warband.Warband;
import io.trenchcrusade.api.warband.troop.Troop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/warband/{warbandId}/troop/{troopId}/upgrade")
public class TroopUpgradeController {
    @Autowired
    private SessionService sessionService;

    @Autowired
    private TroopUpgradeRepository troopUpgradeRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<TroopUpgrade> all(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                                      @PathVariable Long warbandId,
                                                      @PathVariable Long troopId) {
        Warband warband = sessionService.authorizeUserForWarband(authorizationToken, warbandId);
        Troop troop = sessionService.authorizeUserForTroop(troopId, warband);

        return troopUpgradeRepository.findAllByTroop(troop);
    }

    @PostMapping("")
    public @ResponseBody TroopUpgrade create(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                               @RequestBody TroopUpgrade troopUpgrade,
                                               @PathVariable Long warbandId,
                                               @PathVariable Long troopId) {
        Warband warband = sessionService.authorizeUserForWarband(authorizationToken, warbandId);
        Troop troop = sessionService.authorizeUserForTroop(troopId, warband);
        troopUpgrade.setTroop(troop);

        return troopUpgradeRepository.save(troopUpgrade);
    }

    @DeleteMapping("/{id}")
    public @ResponseBody String delete(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                       @PathVariable Long warbandId,
                                       @PathVariable Long troopId,
                                       @PathVariable Long id) {
        Warband warband = sessionService.authorizeUserForWarband(authorizationToken, warbandId);
        sessionService.authorizeUserForTroop(troopId, warband);

        troopUpgradeRepository.deleteById(id);
        return String.valueOf(id);
    }
}