package br.edu.utfpr.pb.pw44s.server.security.dto;

public class AuthorityResponseDTO {
    private String authority;

    public AuthorityResponseDTO() {
    }

    public AuthorityResponseDTO(String authority) {
        this.authority = authority;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}
