package io.trenchcrusade.api.rule.troop_type.upgrade;

import io.trenchcrusade.api.rule.troop_type.TroopType;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Upgrade {
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
    @OneToMany(mappedBy = "upgrade")
    private Set<UpgradeRule> upgradeRules;
    public Set<UpgradeRule> getUpgradeRules() {
        return upgradeRules;
    }

    @OneToMany(mappedBy = "upgrade")
    private Set<UpgradeModifier> upgradeModifiers;
    public Set<UpgradeModifier> getUpgradeModifiers() {
        return upgradeModifiers;
    }

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
    @Column(nullable = false)
    private String name;
    public String getName() {
        return name;
    }
}
