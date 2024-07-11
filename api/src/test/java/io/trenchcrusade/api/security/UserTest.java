package io.trenchcrusade.api.security;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class UserTest {
    @Nested
    class Token {
        @Test
        public void setTokenExpiration_shouldSetAnInstantValued30DaysFromNow() {
            User user = new User();
            user.setTokenExpiration();

            Instant expectedExpiration = Instant.now().plus(30, ChronoUnit.DAYS);
            Instant actualExpiration = user.getTokenExpiration();

            // Allow a small leeway in comparison to account for execution time between operations
            long differenceInSeconds = ChronoUnit.SECONDS.between(expectedExpiration, actualExpiration);

            assertTrue(Math.abs(differenceInSeconds) < 5, "The token expiration should be 30 days from now.");
        }
    }
}