package io.trenchcrusade.api.warband;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/warband")
public class WarbandController {
    @Autowired
    private WarbandRepository warbandRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Warband> getAll() {
        return warbandRepository.findAll();
    }

    @PostMapping("")
    public @ResponseBody Warband create(@RequestBody Warband warband) {
        return warbandRepository.save(warband);
    }
}