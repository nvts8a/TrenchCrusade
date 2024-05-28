package io.trenchcrusade.api.rule.troop_type;

import io.trenchcrusade.api.rule.equipment.Equipment;
import io.trenchcrusade.api.rule.equipment.EquipmentRule;
import io.trenchcrusade.api.rule.faction.FactionTroopType;
import io.trenchcrusade.api.rule.keyword.Keyword;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class TroopType {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    public Long getId() {
        return id;
    }

    // ASSOCIATIONS
    @OneToMany(mappedBy = "troopType")
    private Set<FactionTroopType> factionTroopTypes;

    @OneToMany(mappedBy="troopType")
    private Set<TroopTypeRule> rules;
    public  Set<TroopTypeRule> getRules() {
        return rules;
    }

    @ManyToMany
    @JoinTable(name = "troop_type_keyword",
            joinColumns = @JoinColumn(name = "troop_type_id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id"))
    private Set<Keyword> keywords;
    public Set<Keyword> getKeywords() {
        return keywords;
    }

    @ManyToMany
    @JoinTable(name = "troop_type_equipment",
            joinColumns = @JoinColumn(name = "troop_type_id"),
            inverseJoinColumns = @JoinColumn(name = "equipment_id"))
    private Set<Equipment> equipment;
    public Set<Equipment> getEquipment() {
        return equipment;
    }

    // COLUMNS
    private Integer armour = 0;
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

    private Integer melee = 0;
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

    @Column(nullable = false)
    private String name;
    public String getName() {
        return name;
    }

    private Integer range = 0;
    public Integer getRange() {
        return range;
    }
}