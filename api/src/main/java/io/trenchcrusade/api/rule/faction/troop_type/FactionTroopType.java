package io.trenchcrusade.api.rule.faction.troop_type;

import io.trenchcrusade.api.rule.faction.Faction;
import io.trenchcrusade.api.rule.troop_type.TroopType;
import jakarta.persistence.*;

@Entity
public class FactionTroopType {
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
    @JoinColumn(name = "troop_type_id")
    private TroopType troopType;
    public Long getTroopTypeId() {
        return troopType.getId();
    }

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
    public Integer getMin() {
        return min;
    }
    private String type;
    public String getType() {
        return type;
    }
}
