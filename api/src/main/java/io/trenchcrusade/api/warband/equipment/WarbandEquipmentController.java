package io.trenchcrusade.api.warband.equipment;

import io.trenchcrusade.api.security.SessionService;
import io.trenchcrusade.api.warband.Warband;
import io.trenchcrusade.api.warband.WarbandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/warband/{warbandId}/equipment")
public class WarbandEquipmentController {
    @Autowired
    private SessionService sessionService;

    @Autowired
    private WarbandEquipmentRepository warbandEquipmentRepository;

    @Autowired
    private WarbandRepository warbandRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<WarbandEquipment> all(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                                        @PathVariable Long warbandId) {
        Warband warband = sessionService.authorizeUserFor(authorizationToken, warbandId);
        return warbandEquipmentRepository.findAllByWarband(warband);
    }

    @PostMapping("")
    public @ResponseBody WarbandEquipment create(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                                 @RequestBody WarbandEquipment warbandEquipment,
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