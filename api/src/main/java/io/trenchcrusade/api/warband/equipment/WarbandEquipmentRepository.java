package io.trenchcrusade.api.warband.equipment;

import io.trenchcrusade.api.warband.Warband;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface WarbandEquipmentRepository extends CrudRepository<WarbandEquipment, Long> {
    List<WarbandEquipment> findAllByWarband(Warband warband);
}
