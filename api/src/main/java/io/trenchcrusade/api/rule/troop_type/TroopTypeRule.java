package io.trenchcrusade.api.rule.troop_type;

import io.trenchcrusade.api.rule.faction.Faction;
import jakarta.persistence.*;

@Entity
public class TroopTypeRule {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    public Integer getId() {
        return id;
    }

    // ASSOCIATIONS
    @ManyToOne(optional = false)
    @JoinColumn(name = "troop_type_id")
    private TroopType troopType;

    // COLUMNS
    @Column(nullable = false)
    private String name;
    public String getName() {
        return name;
    }
    @Column(columnDefinition = "TEXT")
    private String rule;
    public String getRule() {
        return rule;
    }
}
