package io.trenchcrusade.api.warband.troop.equipment;

import io.trenchcrusade.api.security.SessionService;
import io.trenchcrusade.api.warband.Warband;
import io.trenchcrusade.api.warband.troop.Troop;
import io.trenchcrusade.api.warband.troop.TroopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Controller
@RequestMapping(path="/warband/{warbandId}/troop/{troopId}/equipment")
public class TroopEquipmentController {
    @Autowired
    private SessionService sessionService;

    @Autowired
    private TroopEquipmentRepository troopEquipmentRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<TroopEquipment> all(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                                      @PathVariable Long warbandId,
                                                      @PathVariable Long troopId) {
        Warband warband = sessionService.authorizeUserForWarband(authorizationToken, warbandId);
        Troop troop = sessionService.authorizeUserForTroop(troopId, warband);

        return troopEquipmentRepository.findAllByTroop(troop);
    }

    @PostMapping("")
    public @ResponseBody TroopEquipment create(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                               @RequestBody TroopEquipment troopEquipment,
                                               @PathVariable Long warbandId,
                                               @PathVariable Long troopId) {
        Warband warband = sessionService.authorizeUserForWarband(authorizationToken, warbandId);
        Troop troop = sessionService.authorizeUserForTroop(troopId, warband);
        troopEquipment.setTroop(troop);

        return troopEquipmentRepository.save(troopEquipment);
    }

    @DeleteMapping("/{id}")
    public @ResponseBody String delete(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                       @PathVariable Long warbandId,
                                       @PathVariable Long troopId,
                                       @PathVariable Long id) {
        Warband warband = sessionService.authorizeUserForWarband(authorizationToken, warbandId);
        sessionService.authorizeUserForTroop(troopId, warband);

        troopEquipmentRepository.deleteById(id);
        return String.valueOf(id);
    }
}