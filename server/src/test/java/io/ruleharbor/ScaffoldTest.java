package io.ruleharbor;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = {
        "spring.datasource.url=jdbc:h2:mem:scaffold;MODE=PostgreSQL;DB_CLOSE_DELAY=-1",
        "spring.datasource.username=sa", "spring.datasource.password=",
        "spring.flyway.enabled=false"
})
class ScaffoldTest {
    @LocalServerPort int port;
    private final HttpClient client = HttpClient.newHttpClient();

    @Test
    void healthIsAvailableWithoutLogin() throws Exception {
        var response = get("/actuator/health");
        assertThat(response.statusCode()).isEqualTo(200);
        assertThat(response.body()).contains("\"status\":\"UP\"");
    }

    @Test
    void csrfTokenCreatesHttpOnlySession() throws Exception {
        var response = get("/api/csrf");
        assertThat(response.statusCode()).isEqualTo(200);
        assertThat(response.body()).contains("\"token\":", "\"headerName\":\"X-CSRF-TOKEN\"");
        assertThat(response.headers().firstValue("set-cookie").orElseThrow())
                .contains("RULEHARBOR_SESSION=", "HttpOnly", "SameSite=Strict");
    }

    @Test
    void mutationsWithoutCsrfAreRejected() throws Exception {
        var request = HttpRequest.newBuilder(uri("/api/scaffold-check"))
                .POST(HttpRequest.BodyPublishers.noBody()).build();
        assertThat(client.send(request, HttpResponse.BodyHandlers.ofString()).statusCode()).isEqualTo(403);
    }

    @Test
    void openApiIsAvailable() throws Exception {
        var response = get("/v3/api-docs");
        assertThat(response.statusCode()).isEqualTo(200);
        assertThat(response.body()).contains("/api/csrf");
    }

    private HttpResponse<String> get(String path) throws Exception {
        return client.send(HttpRequest.newBuilder(uri(path)).GET().build(), HttpResponse.BodyHandlers.ofString());
    }

    private URI uri(String path) {
        return URI.create("http://127.0.0.1:" + port + path);
    }
}
