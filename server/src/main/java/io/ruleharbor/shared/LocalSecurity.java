package io.ruleharbor.shared;

import java.util.Map;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Configuration
public class LocalSecurity {
    @Bean SecurityFilterChain localWorkspace(HttpSecurity http) throws Exception {
        // Single-operator, loopback-only preview. Retain CSRF protection even without login.
        return http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .formLogin(login -> login.disable()).httpBasic(basic -> basic.disable()).build();
    }

    @RestController
    static class SessionController {
        @GetMapping("/api/csrf")
        Map<String, String> csrf(CsrfToken token) {
            return Map.of("token", token.getToken(), "headerName", token.getHeaderName());
        }
    }
}
