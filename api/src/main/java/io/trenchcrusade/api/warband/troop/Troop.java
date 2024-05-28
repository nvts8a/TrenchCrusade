package io.trenchcrusade.api.warband.troop;

import io.trenchcrusade.api.rule.equipment.Equipment;
import io.trenchcrusade.api.rule.troop_type.TroopType;
import io.trenchcrusade.api.warband.Warband;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.Set;

@Entity
public class Troop {
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
    @ManyToOne(optional = false)
    @JoinColumn(name = "troop_type_id")
    private TroopType troopType;
    public TroopType getTroopType() {
        return troopType;
    }
    public void setTroopType(TroopType troopType) {
        this.troopType = troopType;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "warband_id")
    private Warband warband;
    public Long getWarband() {
        return warband.getId();
    }

    @ManyToMany
    @JoinTable(name = "troop_equipment",
            joinColumns = @JoinColumn(name = "troop_id"),
            inverseJoinColumns = @JoinColumn(name = "equipment_id"))
    private Set<Equipment> equipment;
    public Set<Equipment> getEquipment() {
        return equipment;
    }

    // COLUMNS
    private Integer experience = 0;
    public Integer getExperience() {
        return experience;
    }
    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    private String name;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    private Integer scars = 0;
    public Integer getScars() {
        return scars;
    }
    public void setScars(Integer scars) {
        this.scars = scars;
    }
}
