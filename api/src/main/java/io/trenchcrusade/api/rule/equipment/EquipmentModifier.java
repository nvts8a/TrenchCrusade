package io.trenchcrusade.api.rule.equipment;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class EquipmentModifier {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "equipment_id", referencedColumnName = "id", nullable = false)
    private Equipment equipment;

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
