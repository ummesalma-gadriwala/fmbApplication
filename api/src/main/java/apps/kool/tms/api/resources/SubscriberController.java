package apps.kool.tms.api.resources;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.agregate.ParticipantAggregate;
import apps.kool.tms.api.agregate.User;
import apps.kool.tms.api.repository.ParticipantRepository;
import apps.kool.tms.api.repository.UserRepository;

@RestController
@RequestMapping("/subscriber")

public class SubscriberController {
		
	@Autowired
    private UserRepository userRepository;
	
	@RequestMapping(value="/profile/{username}", method= RequestMethod.GET)
    public ResponseEntity<User> geSubscriberById(@PathVariable String username) {
		User user = userRepository.findByUsername(username).orElse(null);
    	return ResponseEntity.ok(user);
    }
    

}
