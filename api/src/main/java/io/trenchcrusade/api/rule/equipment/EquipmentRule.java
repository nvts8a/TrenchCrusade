package io.trenchcrusade.api.rule.equipment;

import jakarta.persistence.*;

@Entity
public class EquipmentRule {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public Long getId() {
        return id;
    }

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "equipment_id", referencedColumnName = "id", nullable = false)
    private Equipment equipment;

    @Column(columnDefinition = "TEXT")
    private String rule;
    public String getRule() {
        return rule;
    }
}
