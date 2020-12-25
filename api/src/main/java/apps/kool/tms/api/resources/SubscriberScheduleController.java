package apps.kool.tms.api.resources;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import apps.kool.tms.api.agregate.OverrideSubscriptionSchedule;
import apps.kool.tms.api.agregate.SubscriptionSchedule;
import apps.kool.tms.api.errorhandling.EntityNotFoundException;
import apps.kool.tms.api.repository.ISubscriberScheduleRepository;
import apps.kool.tms.api.reqres.APIResponse;
import apps.kool.tms.api.reqres.AuthenticationCredentials;
import apps.kool.tms.api.reqres.AuthenticationResponse;
import apps.kool.tms.api.reqres.OverrideSubscriptionScheduleResponse;
import apps.kool.tms.api.reqres.WorkFlowResponse;
import apps.kool.tms.api.utils.WorkFlowUtils;

@RestController
@RequestMapping("/subscriber/schedule")
public class SubscriberScheduleController {
	
	@Autowired
	ISubscriberScheduleRepository subscriberScheduleRepository; 
	 
	@RequestMapping(method = RequestMethod.POST)
	ResponseEntity<Object> addSchedule(@RequestBody SubscriptionSchedule subscriptionSchedule ) {
		subscriberScheduleRepository.saveSubscriptionSchedule(subscriptionSchedule);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(subscriptionSchedule.getSubscriberId()).toUri();
		return ResponseEntity.created(location).build()  ;
	 }
	 
	 @RequestMapping(method = RequestMethod.GET, value = "/week/{subscriptionId}/{weekStartDate}" )
	 ResponseEntity<SubscriptionSchedule> getScheduleByWeek(@PathVariable String subscriptionId, @PathVariable Date weekStartDate ) {
	    return ResponseEntity.ok(subscriberScheduleRepository.getSubscriptionScheduleBySubscriberId(subscriptionId)) ;
	 }
	 
	 @RequestMapping(method = RequestMethod.GET, value = "/{subscriberId}" )
	 ResponseEntity<SubscriptionSchedule> getScheduleBySubscriberId(@PathVariable String subscriberId ) {
	    return ResponseEntity.ok(subscriberScheduleRepository.getSubscriptionScheduleBySubscriberId(subscriberId)) ;
	 }


	@RequestMapping(method = RequestMethod.PUT , value = "/override/{subscriptionId}")
	ResponseEntity<Object> updateOverrideSchedue(@PathVariable String subscriptionId, @RequestBody OverrideSubscriptionSchedule overrideSubscriptionSchedule ) {
		SubscriptionSchedule subscriptionSchedule = subscriberScheduleRepository.getSubscriptionScheduleBySubscriberId(subscriptionId);
		overrideSubscriptionSchedule.setSubscriptionScheduleId(subscriptionSchedule.getId().toString());
		subscriptionSchedule.getOverrideSchedules().add(overrideSubscriptionSchedule);		
		subscriberScheduleRepository.updateSubscriptionSchedule(subscriptionSchedule);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
		.buildAndExpand(
		   subscriptionSchedule.getOverrideSchedules().stream().filter(save -> save.getOverrideStartDate().equals(overrideSubscriptionSchedule.getOverrideStartDate())).findFirst().get().getId()		
		 ).toUri();
		return ResponseEntity.created(location).build()  ;
	}

	 	 
	@RequestMapping(method = RequestMethod.POST , value = "/override/{subscriptionId}")
	ResponseEntity<Object> addOverrideSchedue(@PathVariable String subscriptionId, @RequestBody OverrideSubscriptionSchedule overrideSubscriptionSchedule ) {
		SubscriptionSchedule subscriptionSchedule = subscriberScheduleRepository.addSubscriptionSchedule(subscriptionId, overrideSubscriptionSchedule);
		
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
		.buildAndExpand(
		   subscriptionSchedule.getOverrideSchedules().stream().filter(save -> save.getOverrideStartDate().equals(overrideSubscriptionSchedule.getOverrideStartDate())).findFirst().get().getId()		
		 ).toUri();
		return ResponseEntity.created(location).build()  ;
	}
	
	@RequestMapping(method = RequestMethod.DELETE , value = "/override/{subscriptionId}/{startDate}")
	ResponseEntity<Boolean> deleteOverrideSchedue(@PathVariable String subscriptionId,@PathVariable String startDate ) throws Exception {
		boolean isDeleted = subscriberScheduleRepository.deleteOverrideSchedule(subscriptionId, startDate);
		return ResponseEntity.ok(isDeleted);
	}
	
	 @RequestMapping(method = RequestMethod.GET, value = "/getAll" )
	 ResponseEntity<List<SubscriptionSchedule>> getAllSubscriptionSchedule() {
	    return ResponseEntity.ok(subscriberScheduleRepository.getAllSubscriptionSchedule()) ;
	 }
	 

}
