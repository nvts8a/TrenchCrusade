package io.trenchcrusade.api.warband.troop.upgrade;

import io.trenchcrusade.api.rule.troop_type.upgrade.Upgrade;
import io.trenchcrusade.api.warband.troop.Troop;
import jakarta.persistence.*;

@Entity
public class TroopUpgrade {
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
    @JoinColumn(name = "upgrade_id")
    private Upgrade upgrade;
    public Upgrade getUpgrade() {
        return upgrade;
    }
    public void setUpgrade(Upgrade upgrade) {
        this.upgrade = upgrade;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "troop_id")
    private Troop troop;
    public Long getTroopId() {
        return troop.getId();
    }
    public void setTroop(Troop troop) {
        this.troop = troop;
    }
}

