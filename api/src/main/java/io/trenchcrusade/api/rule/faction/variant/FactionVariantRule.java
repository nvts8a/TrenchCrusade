package io.trenchcrusade.api.rule.faction.variant;

import jakarta.persistence.*;

@Entity
public class FactionVariantRule {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public Long getId() {
        return id;
    }

    // ASSOCIATIONS
    @ManyToOne(optional = false)
    @JoinColumn(name = "faction_variant_id")
    private FactionVariant factionVariant;

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
