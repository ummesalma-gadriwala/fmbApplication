package apps.kool.tms.api.resources;

import javax.validation.Valid;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.agregate.ParticipantAggregate;
import apps.kool.tms.api.repository.ParticipantRepository;
/**This is Sample Controller to demonstrate end to end implementation of various layers of application*/
@RestController
@RequestMapping("/participant")
public class ParticipantController {
    @Autowired
    private ParticipantRepository participantRepository;
    
    @RequestMapping(value="/{id}", method= RequestMethod.GET)
    public ParticipantAggregate getParticipantById(@PathVariable("id") ObjectId id) {
    	return participantRepository.findById(id);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public ParticipantAggregate createParticipant(@Valid @RequestBody ParticipantAggregate participant){
    	participant.setId(ObjectId.get());
    	participant.getSubscriber().setId(ObjectId.get());
    	participant.getContributor().setId(ObjectId.get());
    	participantRepository.save(participant);
    	return participant;
    }
    
}
