package io.trenchcrusade.api.rule.keyword;

import io.trenchcrusade.api.rule.faction.Faction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(path="/keyword")
public class KeywordController {
    @Autowired
    private KeywordRepository keywordRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Map<Long, Keyword> all() {
        Map<Long, Keyword> response = new HashMap<>();
        keywordRepository.findAll().forEach(record -> response.put(record.getId(), record));

        return response;
    }
}