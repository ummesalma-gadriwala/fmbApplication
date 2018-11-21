package apps.kool.tms.api.resources;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.repository.UserRepository;

@RestController
@RequestMapping("/user")
public class AuthenticationController {
	
	private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
  
	//Create User & return Token
	//authenticate && return Token
	//reset User password
	//Change User Roles
	
	
}
