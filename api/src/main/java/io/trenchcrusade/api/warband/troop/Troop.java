package io.trenchcrusade.api.warband.troop;

import io.trenchcrusade.api.rule.equipment.Equipment;
import io.trenchcrusade.api.rule.faction.troop_type.FactionTroopType;
import io.trenchcrusade.api.rule.troop_type.TroopType;
import io.trenchcrusade.api.warband.Warband;
import io.trenchcrusade.api.warband.troop.equipment.TroopEquipment;
import io.trenchcrusade.api.warband.troop.upgrade.TroopUpgrade;
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
    public Long getTroopTypeId() {
        return troopType.getId();
    }
    public void setTroopType(TroopType troopType) {
        this.troopType = troopType;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "faction_troop_type_id")
    private FactionTroopType factionTroopType;
    public Long getFactionTroopTypeId() {
        return factionTroopType.getId();
    }
    public void setFactionTroopType(FactionTroopType factionTroopType) {
        this.factionTroopType = factionTroopType;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "warband_id")
    private Warband warband;
    public Long getWarbandId() {
        return warband.getId();
    }
    public void setWarband(Warband warband) {
        this.warband = warband;
    }

    @OneToMany(
            mappedBy = "troop",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<TroopEquipment> equipment = Set.of();
    public Set<TroopEquipment> getEquipment() {
        return equipment;
    }

    @OneToMany(
            mappedBy = "troop",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private Set<TroopUpgrade> upgrades = Set.of();
    public Set<TroopUpgrade> getUpgrades() {
        return upgrades;
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
