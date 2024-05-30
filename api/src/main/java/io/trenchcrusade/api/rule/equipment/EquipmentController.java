package io.trenchcrusade.api.rule.equipment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(path="/equipment")
public class EquipmentController {
    @Autowired
    private EquipmentRepository equipmentRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Map<Long, Equipment> all() {
        Map<Long, Equipment> response = new HashMap<>();
        equipmentRepository.findAll().forEach(record -> response.put(record.getId(), record));

        return response;
    }
}