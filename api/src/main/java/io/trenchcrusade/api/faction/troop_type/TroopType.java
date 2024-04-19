package io.trenchcrusade.api.faction.troop_type;

import jakarta.persistence.*;

@Entity
public class TroopType {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    public Integer getId() {
        return id;
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

    private String type;
    public String getType() {
        return type;
    }
}