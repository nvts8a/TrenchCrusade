package io.trenchcrusade.api.warband.troop;

import io.trenchcrusade.api.warband.Warband;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TroopRepository extends CrudRepository<Troop, Long> {
    List<Troop> findAllByWarband(Warband warband);
}
