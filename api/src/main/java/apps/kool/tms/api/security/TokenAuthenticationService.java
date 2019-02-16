package apps.kool.tms.api.security;

import com.google.common.collect.ImmutableMap;

import apps.kool.tms.api.agregate.User;
import apps.kool.tms.api.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

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
    		                                                "subscriberId", filteredUser.getSubscriberId()
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
            "subscriberId", user.getSubscriberId()) 
			 ));

  }


  @Override
  public void logout(final User user) {
    // Nothing to doy
	 
  }
}