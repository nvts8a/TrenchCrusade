package io.trenchcrusade.api.rule.troop_type;

import io.trenchcrusade.api.rule.faction.Faction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping(path="/troop-type")
public class TroopTypeController {
    @Autowired
    private TroopTypeRepository troopTypeRepository;

    @GetMapping(path="/all")
    public @ResponseBody Map<Long, TroopType> all() {
        Map<Long, TroopType> response = new HashMap<>();
        troopTypeRepository.findAll().forEach(record -> response.put(record.getId(), record));

        return response;
    }
}
