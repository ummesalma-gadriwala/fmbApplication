package apps.kool.tms.api.security;

import com.google.common.collect.ImmutableMap;

import apps.kool.tms.api.agregate.Previlege;
import apps.kool.tms.api.agregate.Role;
import apps.kool.tms.api.agregate.User;
import apps.kool.tms.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

@Service
@AllArgsConstructor(access = PACKAGE)
@FieldDefaults(level = PRIVATE, makeFinal = true)
final class TokenAuthenticationService implements UserAuthenticationService {
  @NonNull
  TokenService tokens;
  @NonNull
  UserRepository users;

  @Override
  public Optional<String> login(final String username, final String firstLevelAuthenticationAnswer) {
    return users
      .findByUsername(username)
      .filter(user -> Objects.equals(firstLevelAuthenticationAnswer.toUpperCase(), user.getPrimaryAddress().getPostalCode().toUpperCase()))
      .map(filteredUser -> tokens.expiring(ImmutableMap.of("username", username,
    		                                                "subscriberId", filteredUser.getSubscriberId(),
    		                                                "scopes",getAuthorities(filteredUser.getRoles())
    		                                                		.stream().map(GrantedAuthority::getAuthority)
    		                                                		.collect(Collectors.joining(",")),
    		                                                "roles" , filteredUser.getRoles()
    		                                                          .stream().map(Role :: getName)	
    		                                                		  .collect(Collectors.joining(","))	

    		                                               )
    	  ));
  }

  @Override
  public Optional<User> findByToken(final String token) {
    return Optional
      .of(tokens.verify(token))
      .map(map -> map.get("username"))
      .flatMap(users::findByUsername);
  }
  
  @Override
  public Optional<String> verifyAndRenewToken(final String token) {
    return Optional
      .of(tokens.verify(token))
      .map(map -> map.get("username"))
      .flatMap(users::findByUsername)
      .map(user -> tokens.expiring(ImmutableMap.of("username", user.getUsername(),
    		  									   "subscriberId", user.getSubscriberId(),
    		  									   "scopes",getAuthorities(user.getRoles())
			                                           		.stream().map(GrantedAuthority::getAuthority)
			                                           		.collect(Collectors.joining(",")),
			                                       "roles" , user.getRoles()
			                                                 .stream().map(Role :: getName)	
			                                           		 .collect(Collectors.joining(","))
          )));

  }


  @Override
  public void logout(final User user) {
    // Nothing to doy
	 
  }
  
  private Collection<? extends GrantedAuthority> getAuthorities(Collection<Role> roles) {
	    return getGrantedAuthorities(getPrivileges(roles));
  }
  
  private Map<String,List<String>> getPrivilegesByRole(Collection<Role> roles) {
    List<String> previleges = new ArrayList<>();
    Map<String,List<String>> previlegesByRole = new HashMap<String,List<String>>();
    for (Role role : roles) {
       previleges = new ArrayList<>();	
       for (Previlege item : role.getPrevileges()) {
          previleges.add(item.getName());
       }
       
       previlegesByRole.put(role.getName(), previleges);
       
    }
    
    return previlegesByRole;
  }
		 
  private List<String> getPrivileges(Collection<Role> roles) {
    List<String> previleges = new ArrayList<>();
    List<Previlege> collection = new ArrayList<>();
    for (Role role : roles) {
        collection.addAll(role.getPrevileges());
    }
    for (Previlege item : collection) {
        previleges.add(item.getName());
    }
    return previleges;
  }
	 
  private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
    List<GrantedAuthority> authorities = new ArrayList<>();
    for (String privilege : privileges) {
        authorities.add(new SimpleGrantedAuthority(privilege));
    }
    return authorities;
  }

}