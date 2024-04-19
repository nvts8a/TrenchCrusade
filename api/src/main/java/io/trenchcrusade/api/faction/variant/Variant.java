package io.trenchcrusade.api.faction.variant;

import io.trenchcrusade.api.faction.Faction;
import jakarta.persistence.*;

@Entity
public class Variant {
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
    public Faction getFaction() {
        return faction;
    }

    // COLUMNS
    @Column(columnDefinition = "TEXT")
    private String description;
    public String getDescription() {
        return description;
    }

    private String name;
    public String getName() {
        return name;
    }
}
