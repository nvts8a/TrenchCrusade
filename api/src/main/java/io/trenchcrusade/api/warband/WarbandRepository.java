package io.trenchcrusade.api.warband;

import io.trenchcrusade.api.security.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface WarbandRepository extends CrudRepository<Warband, Long> {
    List<Warband> findAllByUser(User user);
}
