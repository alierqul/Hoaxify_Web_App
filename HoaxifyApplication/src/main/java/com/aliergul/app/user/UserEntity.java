package com.aliergul.app.user;


import java.util.Collection;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserEntity implements UserDetails {

  private static final long serialVersionUID = 9066911572038657025L;
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @UniqueUsername
    @NotNull(message="{hoaxify.constraint.username.NotNull.message}")
    @Size(min = 4, max=255 )
    private String username;
    
    @NotNull(message="{hoaxify.constraint.name.NotNull.message}")
    @Size(min = 4, max=255 )
	private String name;
    
    @NotNull(message="{hoaxify.constraint.password.NotNull.message}")
    @Size(min = 8, max=255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message="{hoaxify.constrain.password.Pattern.message}")
    //@JsonIgnore //Json oluştuturken bunu pass geç. görmezdeb gel
	private String password;
    
    @Lob
    private String image;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
      return AuthorityUtils.createAuthorityList("Role_user");
    }

    @Override
    public boolean isAccountNonExpired() {
      return true;
    }

    @Override
    public boolean isAccountNonLocked() {
      return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
      return true;
    }

    @Override
    public boolean isEnabled() {
      return true;
    }
	
	
}
