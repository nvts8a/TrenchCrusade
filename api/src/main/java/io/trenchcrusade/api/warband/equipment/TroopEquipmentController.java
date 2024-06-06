package io.trenchcrusade.api.warband.troop.equipment;

import io.trenchcrusade.api.security.SessionService;
import io.trenchcrusade.api.warband.Warband;
import io.trenchcrusade.api.warband.WarbandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/warband/{warbandId}/equipment")
public class TroopEquipmentController {
    @Autowired
    private SessionService sessionService;

    @Autowired
    private TroopEquipmentRepository warbandEquipmentRepository;

    @Autowired
    private WarbandRepository warbandRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<TroopEquipment> all(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                                      @PathVariable Long warbandId) {
        Warband warband = sessionService.authorizeUserFor(authorizationToken, warbandId);
        return warbandEquipmentRepository.findAllByWarband(warband);
    }

    @PostMapping("")
    public @ResponseBody TroopEquipment create(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                               @RequestBody TroopEquipment warbandEquipment,
                                               @PathVariable Long warbandId) {
        Warband warband = sessionService.authorizeUserFor(authorizationToken, warbandId);
        warbandEquipment.setWarband(warband);

        return warbandEquipmentRepository.save(warbandEquipment);
    }

    @DeleteMapping("/{id}")
    public @ResponseBody String delete(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                       @PathVariable("warbandId") Long warbandId,
                                       @PathVariable("id") Long id) {
        sessionService.authorizeUserFor(authorizationToken, warbandId);
        warbandEquipmentRepository.deleteById(id);
        return String.valueOf(id);
    }
}