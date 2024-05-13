package io.trenchcrusade.api.rule.faction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/faction")
public class FactionController {
    @Autowired
    private FactionRepository factionRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Faction> getAll() {
        return factionRepository.findAll();
    }
}