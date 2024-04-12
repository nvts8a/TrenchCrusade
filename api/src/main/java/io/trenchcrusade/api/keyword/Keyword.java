package io.trenchcrusade.api.keyword;

import jakarta.persistence.*;

@Entity
public class Keyword {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String keyword;
    @Column(columnDefinition = "TEXT")
    private String definition;
}
