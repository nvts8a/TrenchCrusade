package io.trenchcrusade.api.cms;

import io.trenchcrusade.api.rule.keyword.Keyword;
import io.trenchcrusade.api.rule.keyword.KeywordRepository;
import io.trenchcrusade.api.security.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(path="/cms/keyword")
public class KeywordContentController {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private KeywordRepository keywordRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Keyword> all() {
        return keywordRepository.findAll();
    }

    @PostMapping("")
    public @ResponseBody Keyword create(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                      @RequestBody Keyword keyword) {
        sessionService.authorizeUserForCms(authorizationToken);

        return keywordRepository.save(keyword);
    }

    @DeleteMapping("/{id}")
    public @ResponseBody String delete(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationToken,
                                       @PathVariable("id") Long id) {
        sessionService.authorizeUserForCms(authorizationToken);
        keywordRepository.deleteById(id);
        return String.valueOf(id);
    }
}