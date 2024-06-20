package io.trenchcrusade.api.rule.troop_type;

import io.trenchcrusade.api.rule.faction.variant.FactionVariant;
import io.trenchcrusade.api.rule.troop_type.upgrade.Upgrade;
import jakarta.persistence.*;

@Entity
public class TroopTypeUpgrade {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public Long getId() {
        return id;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "upgrade_id")
    private Upgrade upgrade;
    public Upgrade getUpgrade() {
        return upgrade;
    }
    @ManyToOne(optional = false)
    @JoinColumn(name = "troop_type_id")
    private TroopType troopType;
    public Long getTroopTypeId() {
        return troopType.getId();
    }

    @ManyToOne(optional = true)
    @JoinColumn(name = "faction_variant_id")
    private FactionVariant factionVariant;
    public Long getFactionVariantId() {
        return factionVariant != null ? factionVariant.getId() : null;
    }
}
