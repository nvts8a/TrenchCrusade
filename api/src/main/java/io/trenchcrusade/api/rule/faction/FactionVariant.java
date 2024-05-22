package io.trenchcrusade.api.rule.faction;

import jakarta.persistence.*;

@Entity
public class FactionVariant {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    public Integer getId() {
        return id;
    }

    // ASSOCIATIONS
    @ManyToOne(optional = false)
    @JoinColumn(name = "faction_id")
    private Faction faction;

    // COLUMNS
    @Column(columnDefinition = "TEXT")
    private String description;
    public String getDescription() {
        return description;
    }

    @Column(nullable = false)
    private String name;
    public String getName() {
        return name;
    }
}
