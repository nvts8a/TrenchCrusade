package io.trenchcrusade.api.rule.faction.variant;

import io.trenchcrusade.api.rule.faction.Faction;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class FactionVariant {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    // ASSOCIATIONS
    @ManyToOne(optional = false)
    @JoinColumn(name = "faction_id")
    private Faction faction;

    @OneToMany(mappedBy = "factionVariant")
    private Set<FactionVariantRule> factionVariantRules;
    public Set<FactionVariantRule> getFactionVariantRules() {
        return factionVariantRules;
    }

    // COLUMNS
    @Column(columnDefinition = "TEXT")
    private String description;
    public String getDescription() {
        return description;
    }

    @Column(nullable = false)
    private String name;
    public String getName() {
        return name;
    }
}
