package io.trenchcrusade.api.rule.troop_type;

import io.trenchcrusade.api.faction.FactionTroopType;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class TroopType {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    public Integer getId() {
        return id;
    }

    // ASSOCIATIONS
    @OneToMany(mappedBy = "troopType")
    private Set<FactionTroopType> factionTroopTypes;
    public Set<FactionTroopType> getFactionTroopType() {
        return factionTroopTypes;
    }

    // COLUMNS
    private Integer armour;
    public Integer getArmour() {
        return armour;
    }

    private Integer baseSize;
    public Integer getBaseSize() {
        return baseSize;
    }

    @Column(columnDefinition = "TEXT")
    private String description;
    public String getDescription() {
        return description;
    }

    private Integer melee;
    public Integer getMelee() {
        return melee;
    }

    private Integer movement;
    public Integer getMovement() {
        return movement;
    }

    private String movementType;
    public String getMovementType() {
        return movementType;
    }

    private String name;
    public String getName() {
        return name;
    }

    private Integer range;
    public Integer getRange() {
        return range;
    }
}