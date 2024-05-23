package io.trenchcrusade.api.security;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public interface LoginRepository extends CrudRepository<Login, Integer> {
    Login findByUsername(String username);
}
