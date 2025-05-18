package br.edu.utfpr.pb.pw44s.server.security;

import br.edu.utfpr.pb.pw44s.server.model.User;
import br.edu.utfpr.pb.pw44s.server.security.dto.AuthenticationResponse;
import br.edu.utfpr.pb.pw44s.server.security.dto.UserResponseDTO;
import br.edu.utfpr.pb.pw44s.server.service.AuthService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@NoArgsConstructor
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;
    private AuthService authService;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, AuthService authService) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            // Lê os dados de username e password
            User credentials = new ObjectMapper().readValue(request.getInputStream(), User.class);

            // Log para verificar os dados recebidos
            System.out.println("Autenticando usuário: " + credentials.getUsername());

            // Verifica se o usuário existe no banco de dados
            User user = (User) authService.loadUserByUsername(credentials.getUsername());
            System.out.println("Usuário encontrado: " + user.getUsername());

            // Tenta autenticar o usuário
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.getUsername(),
                            credentials.getPassword(),
                            user.getAuthorities()
                    )
            );
        } catch (IOException e) {
            System.out.println("Erro ao ler os dados da requisição: " + e.getMessage());
            throw new RuntimeException("Erro ao ler os dados da requisição", e);
        } catch (AuthenticationException e) {
            System.out.println("Erro de autenticação: " + e.getMessage());
            throw new RuntimeException("Erro de autenticação", e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        try {
            User user = (User) authService.loadUserByUsername(authResult.getName());

            // Log para sucesso na autenticação
            System.out.println("Autenticação bem-sucedida para: " + user.getUsername());

            // Cria o token JWT
            String token = JWT.create()
                    .withSubject(authResult.getName())
                    .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                    .sign(Algorithm.HMAC512(SecurityConstants.SECRET));

            // Define o token no header Authorization
            response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);

            // Opcionalmente, retorna o token no corpo da resposta
            response.setContentType("application/json");
            response.getWriter().write(
                    new ObjectMapper().writeValueAsString(
                            new AuthenticationResponse(token, new UserResponseDTO(user)))
            );
        } catch (Exception e) {
            System.out.println("Erro ao gerar o token ou na autenticação: " + e.getMessage());
        }
    }
}
