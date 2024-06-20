package io.trenchcrusade.api.rule.troop_type.upgrade;

import jakarta.persistence.*;

@Entity
public class UpgradeModifier {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "upgrade_id")
    private Upgrade upgrade;

    @Column(nullable = false)
    private String type;
    public String getType() {
        return type;
    }

    @Column(nullable = false)
    private Integer value;
    public Integer getValue() {
        return value;
    }
}
