package apps.kool.tms.api.resources;

import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.experimental.FieldDefaults;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.errorhandling.EntityNotFoundException;
import apps.kool.tms.api.repository.UserRepository;
import apps.kool.tms.api.reqres.AuthenticationCredentials;
import apps.kool.tms.api.reqres.AuthenticationResponse;
import apps.kool.tms.api.reqres.WorkFlowResponse;
import apps.kool.tms.api.security.UserAuthenticationService;
import apps.kool.tms.api.utils.WorkFlowUtils;

import static lombok.AccessLevel.PACKAGE;
import static lombok.AccessLevel.PRIVATE;

import java.util.Optional;

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
	  AuthenticationResponse login(@RequestBody AuthenticationCredentials credentials ) {
		AuthenticationResponse response  = new AuthenticationResponse();
		Optional<String> token =  authentication.login(credentials.getUsername(), credentials.getFirstLevelAuthenticationAnswer());
		if (token.isPresent()) 
			response.setToken(token.get()); 
		else
		    token.orElseThrow(() -> new EntityNotFoundException("invalid login and/or password")); 
		
		//This is temporary once Workflow engine is ready will move to WorkFlow engine.
		if(WorkFlowUtils.hasSubscriberVerifiedInfo(users.findByUsername(credentials.getUsername()).get())){   
		    response.setWorkFlowResponse(WorkFlowResponse.builder().goToRoute("/profile").build());
		}
		return response ;
	 }
  
  
  
}