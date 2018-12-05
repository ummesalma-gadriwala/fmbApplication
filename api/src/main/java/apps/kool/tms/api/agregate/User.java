package apps.kool.tms.api.agregate;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Value;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

import static java.util.Objects.requireNonNull;

@Builder
@Document
@Data
public class User implements UserDetails {
  private static final long serialVersionUID = 2396654715019746670L;

  private String id=null;
  private String username=null;
  private String password=null;
  private String mobileNumber = null;
  private String additionalInfo = null; 
  private String parentId=null;//hof
  private Address primaryAddress = new Address();
	

//  @JsonCreator
//  User(@JsonProperty("id") final String id,
//       @JsonProperty("username") final String username)        {
//    super();
//    this.id = requireNonNull(id);
//    this.username = requireNonNull(username);
//    
//  }

  @JsonIgnore
  @Override
  public Collection<GrantedAuthority> getAuthorities() {
    return new ArrayList<>();
  }

  @JsonIgnore
  @Override
  public String getPassword() {
    return password;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

}


























































































