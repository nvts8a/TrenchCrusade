package io.trenchcrusade.api.rule.faction;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Faction {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    // ASSOCIATIONS
    @OneToMany(mappedBy = "faction")
    private Set<FactionVariant> factionVariants;

    public Set<FactionVariant> getVariants() {
        return factionVariants;
    }

    @OneToMany(mappedBy = "faction")
    private Set<FactionTroopType> factionTroopTypes;

    public Set<FactionTroopType> getFactionTroopTypes() {
        return factionTroopTypes;
    }

    @OneToMany(mappedBy = "faction")
    private Set<FactionEquipment> factionEquipment;

    public Set<FactionEquipment> getFactionEquipment() {
        return factionEquipment;
    }

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
