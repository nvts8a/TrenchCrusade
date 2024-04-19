package io.trenchcrusade.api.faction;

import io.trenchcrusade.api.faction.troop_type.TroopType;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Faction {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    public Integer getId() {
        return id;
    }

    // ASSOCIATIONS
    @ManyToMany
    @JoinTable(name = "faction_troop_type",
            joinColumns = @JoinColumn(name = "faction_id"),
            inverseJoinColumns = @JoinColumn(name = "troop_type_id"))
    private Set<TroopType> troopTypes;
    public Set<TroopType> getTroopTypes() {
        return troopTypes;
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
