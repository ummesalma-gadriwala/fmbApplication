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
import apps.kool.tms.api.repository.IContributorRepository;
import apps.kool.tms.api.repository.IScheduleRepository;
import apps.kool.tms.api.repository.UserRepository;
import apps.kool.tms.api.reqres.AddContributorRequest;
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
		if(contributorRequest != null ) {
			User user =  users.findBySubscriberId(contributorRequest.getSubscriberId()).stream().filter(filteredUser -> Objects.equals(contributorRequest.getSubscriberId(),filteredUser.getUsername())).findFirst().get();
	    	
	    	if(user != null){
	    		Contributor contributor = Contributor.builder()
						 .contributionDate(new SimpleDateFormat("yyyy-MM-dd").parse(contributorRequest.getContributionDate()))
						 .contributionType(contributorRequest.getContributionType())
						 .messageFromContributor(contributorRequest.getMessageFromContributor())
						 .isContributorAllowedToChooseMenu(contributorRequest.isContributorAllowedToChooseMenu())
						 .user(user)
						 .build();
	    		contributorRepository.save(contributor);
			   	//Add Contributor to Schedule
				try {
					Schedule schedule = scheduleRepository.findByDailyDate(new SimpleDateFormat("yyyy-MM-dd").parse(contributorRequest.getContributionDate()));
					if(schedule == null) {
						schedule = Schedule.builder()
											.dailyDate(new SimpleDateFormat("yyyy-MM-dd").parse(contributorRequest.getContributionDate()))
											.contributors(new Contributor[]{contributor} )
											.build();
					} else {
						if(schedule.getContributors() == null){
							schedule.setContributors(new Contributor[]{contributor} );
						} else {
							List<Contributor> contributorList = new ArrayList<Contributor>(Arrays.asList(schedule.getContributors()));
							contributorList.add(contributor);
							Contributor[] contributors = new Contributor [contributorList.size()];
							int count =0 ;
							for (Contributor contributor2 : contributorList) {
								contributors[count] = contributor2;
								count++;
							}
							schedule.setContributors(contributors);
						}					
					}
					scheduleRepository.save(schedule);
				} catch (ParseException e) {
					e.printStackTrace();
				}
				return ResponseEntity.ok(true);
	    	} else {
	    		// throw 404 user not find
	    	}
	    	
	    }
	    return ResponseEntity.ok(false);
	}

}
