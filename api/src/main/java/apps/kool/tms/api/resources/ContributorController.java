package apps.kool.tms.api.resources;

import java.text.ParseException;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import apps.kool.tms.api.repository.IContributorRepository;
import apps.kool.tms.api.repository.IScheduleRepository;
import apps.kool.tms.api.repository.UserRepository;
import apps.kool.tms.api.reqres.AddContributorRequest;
import apps.kool.tms.api.utils.ScheduleUtils;


@RestController
@RequestMapping("/contributor")

public class ContributorController {
	
		
	@Autowired
	IContributorRepository contributorRepository;
	
	@Autowired
	IScheduleRepository scheduleRepository;
	
	@Autowired
	UserRepository users;
	
	//@PreAuthorize("hasRole('FMB_ROLE_OPERATIONS')")
	@RequestMapping( value = "/schedule",  method = RequestMethod.POST)
	ResponseEntity<Boolean> add(@RequestBody AddContributorRequest contributorRequest ) throws ParseException {
		ScheduleUtils.addOrUpdateContributor(contributorRequest,users,scheduleRepository, contributorRepository);
	    return ResponseEntity.ok(false);
	}

	

}
