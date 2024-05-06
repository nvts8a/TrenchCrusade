package io.trenchcrusade.api.faction.variant;

import io.trenchcrusade.api.faction.Faction;
import io.trenchcrusade.api.rule.equipment.Equipment;
import jakarta.persistence.*;

@Entity
public class FactionEquipment {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    public Integer getId() {
        return id;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "faction_id")
    private Faction faction;

    @ManyToOne(optional = false)
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;

    private Integer cost;
    public Integer getCost() {
        return cost;
    }

    private String currency;
    public String getCurrency() {
        return currency;
    }

    private Integer max;
    public Integer getMax() {
        return max;
    }

    private Integer min;
    public Integer geMin() {
        return min;
    }
}
