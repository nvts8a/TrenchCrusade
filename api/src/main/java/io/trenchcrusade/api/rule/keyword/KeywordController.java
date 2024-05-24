package io.trenchcrusade.api.rule.keyword;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/keyword")
public class KeywordController {
    @Autowired
    private KeywordRepository keywordRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Keyword> all() {
        return keywordRepository.findAll();
    }
}