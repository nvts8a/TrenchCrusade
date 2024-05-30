package io.trenchcrusade.api.rule.faction.equipment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(path="/faction/equipment")
public class FactionEquipmentController {
    @Autowired
    private FactionEquipmentRepository factionEquipmentRepository;

    @GetMapping(path="/all")
    public @ResponseBody Map<Long, Map<Long, FactionEquipment>> all() {
        Map<Long, Map<Long, FactionEquipment>> response = new HashMap<>();
        factionEquipmentRepository.findAll().forEach(record -> {
            if (!response.containsKey(record.getFactionId())) response.put(record.getFactionId(), new HashMap<>());
            response.get(record.getFactionId()).put(record.getId(), record);
        });

        return response;
    }
}
