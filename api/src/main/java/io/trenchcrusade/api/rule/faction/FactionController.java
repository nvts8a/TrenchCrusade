package io.trenchcrusade.api.rule.faction;

import io.trenchcrusade.api.warband.Warband;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Controller
@RequestMapping(path="/faction")
public class FactionController {
    @Autowired
    private FactionRepository factionRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Faction> all() {
        return factionRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Faction get(@PathVariable("id") Long id) {
        Optional<Faction> faction = factionRepository.findById(id);
        if (faction.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Faction " + id + "not found.");

        return faction.get();
    }
}