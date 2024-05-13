package io.trenchcrusade.api.warband;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Controller
@RequestMapping(path="/warband")
public class WarbandController {
    @Autowired
    private WarbandRepository warbandRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Warband> all() {
        return warbandRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Warband get(@PathVariable("id") Integer id) {
        Optional<Warband> warband = warbandRepository.findById(id);
        if (warband.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Warband " + id + "not found.");

        return warband.get();
    }

    @PostMapping("")
    public @ResponseBody Warband create(@RequestBody Warband warband) {
        return warbandRepository.save(warband);
    }

    @DeleteMapping("/{id}")
    public @ResponseBody String delete(@PathVariable("id") Integer id) {
        warbandRepository.deleteById(id);
        return String.valueOf(id);
    }

    @PatchMapping("/{id}")
    public @ResponseBody Warband update(@PathVariable("id") Integer id, @RequestBody Warband warbandUpdates) {
        Optional<Warband> warband = warbandRepository.findById(id);
        if (warband.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Warband " + warbandUpdates.getId() + "not found.");

        return warbandRepository.save(warband.get().update(warbandUpdates));
    }

}