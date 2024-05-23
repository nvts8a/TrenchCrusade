package io.trenchcrusade.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class LoginDetailsService implements UserDetailsService {

    @Autowired
    private LoginRepository loginRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        Login login = loginRepository.findByUsername(username);
        if (login == null) throw new UsernameNotFoundException(username);

        return login;
    }

    public Collection<UserDetails> findAllUserDetails() {
        List<UserDetails> loginCollection = new ArrayList<>();
        loginRepository.findAll().forEach(loginCollection::add);

        return loginCollection;
    }
}
