package io.trenchcrusade.api.warband.troop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Controller
@RequestMapping(path="/warband/{id}/troop")
public class TroopController {
    @Autowired
    private TroopRepository troopRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Troop> all(@PathVariable Integer id) {
        return troopRepository.findAllByWarbandId(id);
    }

    @PostMapping("")
    public @ResponseBody Troop create(@RequestBody Troop troop, @PathVariable Integer id) {
        //if (!Objects.equals(troop.getWarband(), id))
        return troopRepository.save(troop);
    }
}