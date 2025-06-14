package br.edu.utfpr.pb.pw44s.server.security;

import br.edu.utfpr.pb.pw44s.server.service.AuthService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@EnableWebSecurity
@Configuration
public class WebSecurity {

    private final AuthService authService;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    public WebSecurity(AuthService authService, AuthenticationEntryPoint authenticationEntryPoint) {
        this.authService = authService;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(authService).passwordEncoder(passwordEncoder());

        AuthenticationManager authenticationManager = authenticationManagerBuilder.build();

        http.headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable));
        http.csrf(AbstractHttpConfigurer::disable);
        http.cors(cors -> corsConfigurationSource());
        http.exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(authenticationEntryPoint));

        http.authorizeHttpRequests(authorize -> authorize
                // 🔓 Libera a criação de novos usuários
                .requestMatchers(antMatcher(HttpMethod.POST, "/users")).permitAll()
                .requestMatchers(antMatcher(HttpMethod.POST, "/users/**")).permitAll() // Caso haja sub-rotas para users
                // 🔓 Libera o login
                .requestMatchers(antMatcher(HttpMethod.POST, "/login")).permitAll()
                // 🔓 Libera o acesso à listagem de produtos e categorias (AGORA COM OS NOMES CORRETOS!)
                .requestMatchers(antMatcher(HttpMethod.GET, "/products")).permitAll() // Listar todos os produtos
                .requestMatchers(antMatcher(HttpMethod.GET, "/products/**")).permitAll() // Acessar produto por ID, etc.
                .requestMatchers(antMatcher(HttpMethod.GET, "/categories")).permitAll() // Listar todas as categorias
                .requestMatchers(antMatcher(HttpMethod.GET, "/categories/**")).permitAll() // Acessar categoria por ID, etc.
                // 🔓 Libera recursos estáticos (se você tiver imagens locais no futuro)
                .requestMatchers(antMatcher(HttpMethod.GET, "/images/**")).permitAll() // Ex: http://localhost:8080/images/nome.png
                // 🔓 Libera o H2 e páginas de erro
                .requestMatchers(antMatcher("/h2-console/**")).permitAll()
                .requestMatchers(antMatcher("/error/**")).permitAll()
                // 🔒 Qualquer outra rota exige autenticação
                .anyRequest().authenticated()
        );

        http.authenticationManager(authenticationManager)
                .addFilter(new JWTAuthenticationFilter(authenticationManager, authService))
                .addFilter(new JWTAuthorizationFilter(authenticationManager, authService))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}