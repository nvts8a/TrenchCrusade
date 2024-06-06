package io.trenchcrusade.api.warband.troop.equipment;

import io.trenchcrusade.api.warband.troop.Troop;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TroopEquipmentRepository extends CrudRepository<TroopEquipment, Long> {
    List<TroopEquipment> findAllByTroop(Troop troop);
}
