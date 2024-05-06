package io.trenchcrusade.api.rule.equipment;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class EquipmentModifier {
    @Id // KEY
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // ASSOCIATIONS
    @ManyToOne
    @JoinColumn(name = "equipment_id", referencedColumnName = "id", nullable = false)
    private Equipment equipment;
    public Equipment getEquipment() {
        return equipment;
    }

    private String type;
    public String getType() {
        return type;
    }

    private Integer value;
    public Integer getValue() {
        return value;
    }
}
