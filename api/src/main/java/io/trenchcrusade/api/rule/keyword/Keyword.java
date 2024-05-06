package io.trenchcrusade.api.rule.keyword;

import jakarta.persistence.*;

@Entity
public class Keyword {

    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    public Integer getId() {
        return id;
    }

    // COLUMNS
    @Column(columnDefinition = "TEXT")
    private String definition;
    public String getDefinition() {
        return definition;
    }

    private String name;
    public String getName() {
        return name;
    }
}
