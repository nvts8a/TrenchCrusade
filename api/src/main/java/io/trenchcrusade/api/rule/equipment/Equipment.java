package io.trenchcrusade.api.rule.equipment;

import io.trenchcrusade.api.rule.faction.equipment.FactionEquipment;
import io.trenchcrusade.api.rule.keyword.Keyword;
import jakarta.persistence.*;

import java.util.Set;


@Entity
public class Equipment {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    public Long getId() {
        return id;
    }

    // ASSOCIATIONS
    @OneToMany(mappedBy="equipment")
    private Set<EquipmentModifier> modifiers;
    public  Set<EquipmentModifier> getModifiers() {
        return modifiers;
    }

    @OneToMany(mappedBy="equipment")
    private Set<EquipmentRule> rules;
    public  Set<EquipmentRule> getRules() {
        return rules;
    }

    @ManyToMany
    @JoinTable(name="equipment_keyword",
            joinColumns = @JoinColumn(name="equipment_id"),
            inverseJoinColumns = @JoinColumn(name="keyword_id"))
    private Set<Keyword> keywords;
    public Set<Keyword> getKeywords() {
        return keywords;
    }

    @OneToMany(mappedBy="equipment")
    private Set<FactionEquipment> factionEquipment;

    // COLUMNS
    @Column(columnDefinition="TEXT")
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
