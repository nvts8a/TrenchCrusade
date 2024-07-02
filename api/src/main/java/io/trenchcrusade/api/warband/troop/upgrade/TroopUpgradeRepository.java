package io.trenchcrusade.api.warband.troop.upgrade;

import io.trenchcrusade.api.warband.troop.Troop;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TroopUpgradeRepository extends CrudRepository<TroopUpgrade, Long> {
    List<TroopUpgrade> findAllByTroop(Troop troop);
}
