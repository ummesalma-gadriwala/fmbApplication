package apps.kool.tms.api.resources;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.agregate.Contributor;
import apps.kool.tms.api.agregate.Schedule;
import apps.kool.tms.api.agregate.User;
import apps.kool.tms.api.errorhandling.EntityNotFoundException;
import apps.kool.tms.api.repository.IContributorRepository;
import apps.kool.tms.api.repository.IScheduleRepository;
import apps.kool.tms.api.repository.UserRepository;
import apps.kool.tms.api.reqres.AddContributorRequest;
import apps.kool.tms.api.utils.ScheduleUtils;
import lombok.NonNull;


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
