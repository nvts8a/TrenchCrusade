package io.trenchcrusade.api.warband.troop;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TroopRepository extends CrudRepository<Troop, Long> {
    List<Troop> findAllByWarbandId(Long warbandId);
}
