package io.trenchcrusade.api.keyword;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

public class KeywordController {
    private KeywordRepository keywordRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Keyword> getAllKeywords() {
        return keywordRepository.findAll();
    }
}
