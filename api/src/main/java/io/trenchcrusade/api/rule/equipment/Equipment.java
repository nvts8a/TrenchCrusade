package io.trenchcrusade.api.rule.equipment;

import io.trenchcrusade.api.faction.FactionTroopType;
import jakarta.persistence.*;

import java.util.Set;


@Entity
public class Equipment {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    public Integer getId() {
        return id;
    }

    // ASSOCIATIONS
    @OneToMany(mappedBy="equipment")
    private Set<EquipmentModifier> modifiers;
    public  Set<EquipmentModifier> getEquipmentModifiers() {
        return modifiers;
    }

    // COLUMNS
    @Column(columnDefinition = "TEXT")
    private String description;
    public String getDescription() {
        return description;
    }

    private String handedness;
    public String getHandedness() {
        return handedness;
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
