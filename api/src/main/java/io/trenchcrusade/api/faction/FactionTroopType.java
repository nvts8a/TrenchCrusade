package io.trenchcrusade.api.faction;

import io.trenchcrusade.api.rule.troop_type.TroopType;
import jakarta.persistence.*;

@Entity
public class FactionTroopType {
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
    @JoinColumn(name = "troop_type_id")
    private TroopType troopType;

    @Column(nullable = false)
    private Integer cost;
    public Integer getCost() {
        return cost;
    }

    @Column(nullable = false)
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
    private String type;
    public String getType() {
        return type;
    }
}
