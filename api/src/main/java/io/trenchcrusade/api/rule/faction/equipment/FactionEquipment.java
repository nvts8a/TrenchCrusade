package io.trenchcrusade.api.rule.faction.equipment;

import io.trenchcrusade.api.rule.equipment.Equipment;
import io.trenchcrusade.api.rule.faction.Faction;
import jakarta.persistence.*;

@Entity
public class FactionEquipment {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public Long getId() {
        return id;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "faction_id")
    private Faction faction;
    public Long getFactionId() {
        return faction.getId();
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;
    public Equipment getEquipment() {
        return equipment;
    }

    @Column(nullable = false)
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
    public Integer getMin() {
        return min;
    }

    private String filter;
    public String getFilter() {
        return filter;
    }
}
