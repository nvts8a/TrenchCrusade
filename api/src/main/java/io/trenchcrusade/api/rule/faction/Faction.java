package io.trenchcrusade.api.rule.faction;

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
    @OneToMany(mappedBy = "faction")
    private Set<Variant> variants;

    public Set<Variant> getVariants() {
        return variants;
    }

    @OneToMany(mappedBy = "faction")
    private Set<FactionTroopType> factionTroopTypes;

    @OneToMany(mappedBy = "faction")
    private Set<FactionEquipment> factionEquipment;

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
