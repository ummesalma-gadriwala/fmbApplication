package apps.kool.tms.api.resources;


import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.agregate.OverrideSubscriptionSchedule;
import apps.kool.tms.api.agregate.SubscriptionSchedule;
import apps.kool.tms.api.repository.ISubscriberScheduleRepository;
import apps.kool.tms.api.utils.SectorName;

@RestController
@RequestMapping("/admin")
public class AdminReportController {
	
	@Autowired
	ISubscriberScheduleRepository subscriberScheduleRepository; 
		
	@RequestMapping(method = RequestMethod.GET, value = "sector/meal/count/{selectedDate}")
	ResponseEntity<Map<SectorName, Integer>> dailyThaliCountBySector(@PathVariable String selectedDate ) throws Exception {
		LocalDate localDateSelectedDate = LocalDate.parse(selectedDate);
		List <SubscriptionSchedule> subscriptionSchedules = subscriberScheduleRepository.getAllSubscriptionSchedule();
		List<OverrideSubscriptionSchedule> overrideSubscriptionSchedules = subscriberScheduleRepository.getOverrideScheduledForDate(selectedDate);
		Map<SectorName, Integer> reportData = new HashMap<SectorName, Integer>();
		
		
		subscriptionSchedules.forEach(subscriptionSchedule -> { 
			
			Optional<OverrideSubscriptionSchedule> filteredOverrideSubscriptionSchedule = overrideSubscriptionSchedules.stream().filter(overrideSubscriptionSchedule -> 
				      overrideSubscriptionSchedule.getSubscriptionScheduleId().equals(subscriptionSchedule.getId().toString())
					).findFirst();		
			if(subscriptionSchedule.getZone()!=null && subscriptionSchedule.getOptedSchedule().get(localDateSelectedDate.getDayOfWeek())!=null){
		    	Integer count = null;
		    	if(filteredOverrideSubscriptionSchedule.isPresent()) {
					count =  filteredOverrideSubscriptionSchedule.get().getWeeklyOverrideSchedule().get(localDateSelectedDate.getDayOfWeek());
				} else {
					count =  subscriptionSchedule.getOptedSchedule().get(localDateSelectedDate.getDayOfWeek());
				}
		    	if( reportData.containsKey(subscriptionSchedule.getZone()) ){
				    reportData.put(subscriptionSchedule.getZone(), reportData.get(subscriptionSchedule.getZone()) + count);
				} else {
					reportData.put(subscriptionSchedule.getZone(), count);
				}
			}
		 });
		
		return ResponseEntity.ok(reportData);
	}
		
		
	


	
}
