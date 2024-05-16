package io.trenchcrusade.api.rule.troop_type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/troop-type")
public class TroopTypeController {
    @Autowired
    private TroopTypeRepository troopTypeRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<TroopType> all() {
        return troopTypeRepository.findAll();
    }
}
