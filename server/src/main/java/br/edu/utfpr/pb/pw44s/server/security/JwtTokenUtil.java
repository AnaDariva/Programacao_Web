package br.edu.utfpr.pb.pw44s.server.security;

import br.edu.utfpr.pb.pw44s.server.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class JwtTokenUtil {

    // Método para recuperar o usuário autenticado diretamente do contexto de segurança
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            return (User) authentication.getPrincipal();
        }
        return null;
    }
}
