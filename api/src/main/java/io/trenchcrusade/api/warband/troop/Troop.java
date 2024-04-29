package io.trenchcrusade.api.warband.troop;

import io.trenchcrusade.api.faction.troop_type.TroopType;
import io.trenchcrusade.api.warband.Warband;
import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
public class Troop {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
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
    public Integer getWarband() {
        return warband.getId();
    }

    // COLUMNS
    @ColumnDefault("0")
    private Integer experience;
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

    @ColumnDefault("0")
    private Integer scars;
    public Integer getScars() {
        return scars;
    }
    public void setScars(Integer scars) {
        this.scars = scars;
    }
}
