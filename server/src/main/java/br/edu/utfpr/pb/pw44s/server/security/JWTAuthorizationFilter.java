package br.edu.utfpr.pb.pw44s.server.security;

import br.edu.utfpr.pb.pw44s.server.model.User;
import br.edu.utfpr.pb.pw44s.server.service.AuthService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException; // <-- NOVO IMPORT
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
    private final AuthService authService;

    public JWTAuthorizationFilter(AuthenticationManager authenticationManager, AuthService authService) {
        super(authenticationManager);
        this.authService = authService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws IOException, ServletException {

        // O Spring Security irá automaticamente pular este filtro para URLs permitAll()
        // se a configuração em WebSecurity.java estiver correta e os filtros forem registrados adequadamente.
        // O principal aqui é garantir que a validação do token não jogue exceção para requisições não-autenticadas.

        String header = request.getHeader(SecurityConstants.HEADER_STRING);

        // Se o cabeçalho de autorização não estiver presente ou não começar com o prefixo
        // simplesmente passa a requisição para o próximo filtro na cadeia.
        // O Spring Security (via authorizeHttpRequests) vai decidir se a rota precisa de autenticação.
        if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }


        UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(request);

        // Se a autenticação foi obtida (token válido), define no contexto de segurança
        // Caso contrário (token inválido/expirado/ausente), authenticationToken será null,
        // e o contexto de segurança não será definido, permitindo que a cadeia de filtros
        // continue e a regra 'permitAll()' ou 'authenticated()' do WebSecurity atue.
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        // Continua a cadeia de filtros
        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(SecurityConstants.HEADER_STRING);

        if (token != null) {
            try {
                // Remove o prefixo do token
                String userSubject = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET))
                        .build()
                        .verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
                        .getSubject(); // Pega o 'subject' que é o username

                // Se o subject (username) não for nulo e o usuário existir
                if (userSubject != null) {
                    User user = (User) authService.loadUserByUsername(userSubject);
                    // Retorna um token de autenticação válido com as authorities do usuário
                    return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                }
            } catch (JWTVerificationException exception) {
                // Captura as exceções de verificação JWT (token inválido, expirado, etc.)
                // e imprime para depuração. Não lança para que a requisição continue
                // e o Spring Security possa lidar com 'permitAll()' ou outros erros.
                System.err.println("JWT Verification Failed: " + exception.getMessage());
                return null; // Retorna nulo se o token for inválido/expirado
            } catch (Exception e) {
                // Captura outras exceções inesperadas
                System.err.println("Erro inesperado ao processar JWT: " + e.getMessage());
                return null;
            }
        }
        return null; // Retorna nulo se não houver token ou se for inválido
    }
}