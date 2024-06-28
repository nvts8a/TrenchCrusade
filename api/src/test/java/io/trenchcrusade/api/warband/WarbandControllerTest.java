package io.trenchcrusade.api.warband;

import com.github.javafaker.Faker;
import io.trenchcrusade.api.security.SessionService;
import io.trenchcrusade.api.security.User;
import io.trenchcrusade.api.security.UserDetailsImpl;
import io.trenchcrusade.api.security.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class WarbandControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SessionService sessionService;

    @Autowired
    private UserRepository userRepository;

    private final Faker faker = new Faker();
    private UserDetailsImpl userDetails;

    @BeforeEach
    public void init() {
        User user = new User();
        user.setUsername(faker.starTrek().character());
        user.setPassword(faker.internet().password());
        userRepository.save(user);
        userDetails = new UserDetailsImpl(user);
    }

    @Nested
    public class WarbandAll {
        @Test
        public void whenSessionServiceIsNotLoaded_returnStatusForbidden() throws Exception {
            mockMvc.perform(get("/warband/all").header("Authorization", "validToken"))
                    .andExpect(status().isForbidden());
        }

        @Test
        public void whenSessionServiceHasValidToken_returnStatusOk() throws Exception {
            when(sessionService.loadUserBy("validToken")).thenReturn(userDetails);

            mockMvc.perform(get("/warband/all").header("Authorization", "validToken"))
                    .andExpect(status().isOk());
        }
    }

    @Nested
    public class WarbandById {
        @Test
        public void whenSessionServiceIsNotLoaded_returnStatusForbidden() throws Exception {
            mockMvc.perform(get("/warband/1").header("Authorization", "validToken"))
                    .andExpect(status().isForbidden());
        }
    }
}