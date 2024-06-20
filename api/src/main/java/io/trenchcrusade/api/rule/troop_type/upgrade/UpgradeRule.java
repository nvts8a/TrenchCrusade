package io.trenchcrusade.api.rule.troop_type.upgrade;

import io.trenchcrusade.api.rule.faction.variant.FactionVariantRule;
import jakarta.persistence.*;

@Entity
public class UpgradeRule {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "upgrade_id")
    private Upgrade upgrade;

    @OneToOne
    @JoinColumn(name = "faction_variant_rule_id")
    private FactionVariantRule factionVariantRule;
    public FactionVariantRule getFactionVariantRule() {
        return factionVariantRule;
    }
}
