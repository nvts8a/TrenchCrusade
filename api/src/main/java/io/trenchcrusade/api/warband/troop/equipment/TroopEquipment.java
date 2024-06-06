package io.trenchcrusade.api.warband.troop.equipment;

import io.trenchcrusade.api.rule.equipment.Equipment;
import io.trenchcrusade.api.rule.faction.equipment.FactionEquipment;
import io.trenchcrusade.api.warband.troop.Troop;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class TroopEquipment {
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
    public Long getEquipment() {
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
    @JoinColumn(name = "troop_id")
    private Troop troop;
    public Long getTroopId() {
        return troop.getId();
    }
    public void setTroop(Troop troop) {
        this.troop = troop;
    }
}
