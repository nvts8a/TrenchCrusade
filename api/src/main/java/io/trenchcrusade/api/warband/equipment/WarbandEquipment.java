package io.trenchcrusade.api.warband.equipment;

import io.trenchcrusade.api.rule.equipment.Equipment;
import io.trenchcrusade.api.rule.faction.equipment.FactionEquipment;
import io.trenchcrusade.api.warband.Warband;
import jakarta.persistence.*;

@Entity
public class WarbandEquipment {
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
    @JoinColumn(name = "equipment_id")
    private Equipment equipment;
    public Long getEquipmentId() {
        return equipment.getId();
    }
    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "faction_equipment_id")
    private FactionEquipment factionEquipment;
    public Long getFactionEquipmentId() {
        return factionEquipment.getId();
    }
    public void setFactionEquipment(FactionEquipment factionEquipment) {
        this.factionEquipment = factionEquipment;
    }

    @ManyToOne(optional = false)
    @JoinColumn(name = "warband_id")
    private Warband warband;
    public Long getWarbandId() {
        return warband.getId();
    }
    public void setWarband(Warband warband) {
        this.warband = warband;
    }
}
