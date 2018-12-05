package apps.kool.tms.api.resources;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.repository.UserRepository;
import apps.kool.tms.api.reqres.AuthenticationCredentials;
import apps.kool.tms.api.security.UserAuthenticationService;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/user/token")
@FieldDefaults(level = PRIVATE, makeFinal = true)
@AllArgsConstructor(access = PACKAGE)
final class AuthenticationController {
  @NonNull
  UserAuthenticationService authentication;
  @NonNull
  UserRepository users;

//  @PostMapping("/register")
//  String register(
//    @RequestParam("username") final String username,
//    @RequestParam("postalcode") final String postalcode) {
//    users
//      .save(
//        User
//          .builder()
//          .id(username)
//          .username(username)
//          .(password)
//          .build()
//      );
//
//    return login(username, password);
//  }

  @RequestMapping(method = RequestMethod.POST)
  String login(@RequestBody AuthenticationCredentials credentials ) {
    return authentication
      .login(credentials.getUsername(), credentials.getFirstLevelAuthenticationAnswer())
      .orElseThrow(() -> new RuntimeException("invalid login and/or password"));
  }
  
}