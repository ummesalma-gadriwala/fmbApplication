package apps.kool.tms.api.resources;


import java.time.LocalDate;
import java.util.ArrayList;
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
import apps.kool.tms.api.agregate.PackagingInfo;
import apps.kool.tms.api.agregate.SubscriptionSchedule;
import apps.kool.tms.api.agregate.TiffinPersonalization;
import apps.kool.tms.api.agregate.MealOverridedReportInfo;
import apps.kool.tms.api.repository.ISubscriberScheduleRepository;
import apps.kool.tms.api.repository.ITiffinPersonalizationRepository;
import apps.kool.tms.api.utils.MealCountOverrideType;
import apps.kool.tms.api.utils.SectorName;

@RestController
@RequestMapping("/admin")
public class AdminReportController {
	
	@Autowired
	ISubscriberScheduleRepository subscriberScheduleRepository; 
	
	@Autowired
	ITiffinPersonalizationRepository tiffinPersonalizationRepository; 
		
	@RequestMapping(method = RequestMethod.GET, value = "sector/meal/count/{selectedDate}")
	ResponseEntity<Map<SectorName, PackagingInfo>> dailyThaliCountBySector(@PathVariable String selectedDate ) throws Exception {
		LocalDate localDateSelectedDate = LocalDate.parse(selectedDate);
		List <SubscriptionSchedule> subscriptionSchedules = subscriberScheduleRepository.getAllSubscriptionSchedule();
		List <TiffinPersonalization> personalizations =  tiffinPersonalizationRepository.getPersonlizations();
		List<OverrideSubscriptionSchedule> overrideSubscriptionSchedules = subscriberScheduleRepository.getOverrideScheduledForDate(selectedDate);
		Map<SectorName, PackagingInfo> reportData = new HashMap<SectorName, PackagingInfo>();
		
		
		if(subscriptionSchedules == null || subscriptionSchedules.isEmpty())
			return ResponseEntity.ok(reportData);
		subscriptionSchedules.forEach(subscriptionSchedule -> {
			int tiffinCount = 0;
			int noRiceCount = 0;
			int cancelCount = 0;
			int noRiceCancellationCount =0 ;
			int noRiceAdditionCount = 0;
			int additionCount = 0;
			MealOverridedReportInfo overrideReportInfo= null;
			List<MealOverridedReportInfo> overrideDetails = new ArrayList<MealOverridedReportInfo>();
			String firstName = subscriptionSchedule.getUser() != null? subscriptionSchedule.getUser().getFirstName() : null;
			String lastName = subscriptionSchedule.getUser() != null? subscriptionSchedule.getUser().getLastName() : null;
					
		
			if(subscriptionSchedule.getOptedSchedule().get(localDateSelectedDate.getDayOfWeek()) != null) {
				
				tiffinCount =  subscriptionSchedule.getOptedSchedule().get(localDateSelectedDate.getDayOfWeek());
				
				Optional<TiffinPersonalization> tiffinPersonalization = personalizations.stream().filter(personalization -> 
					personalization.getSubscriptionScheduleId().toString().equals(subscriptionSchedule.getId().toString())
				).findFirst();
				
				if(tiffinPersonalization.isPresent() && tiffinPersonalization.get().getNoRice() != null && tiffinPersonalization.get().getNoRice().isActivate()) {
					noRiceCount = tiffinPersonalization.get().getNoRice().getTiffinCount();
				}
				
				Optional<OverrideSubscriptionSchedule> filteredOverrideSubscriptionSchedule = overrideSubscriptionSchedules.stream().filter(overrideSubscriptionSchedule -> 
					      overrideSubscriptionSchedule.getSubscriptionScheduleId().equals(subscriptionSchedule.getId().toString())
						).findFirst();
				
				if(subscriptionSchedule.getZone()!=null && subscriptionSchedule.getOptedSchedule().get(localDateSelectedDate.getDayOfWeek())!=null){
			    	Integer overrideCount = null;
			    	overrideReportInfo= null;
			    	if(filteredOverrideSubscriptionSchedule.isPresent()) {
						overrideCount =  filteredOverrideSubscriptionSchedule.get().getWeeklyOverrideSchedule().get(localDateSelectedDate.getDayOfWeek());
						if(filteredOverrideSubscriptionSchedule.get().getPersonalization() != null && 
								filteredOverrideSubscriptionSchedule.get().getPersonalization().getNoRice().isActivate()){
							noRiceCount = filteredOverrideSubscriptionSchedule.get().getPersonalization().getNoRice().getTiffinCount(); 
						}
						System.out.println( subscriptionSchedule.getSubscriberId());
						boolean isTiffinCancelled = tiffinCount > overrideCount;
						if(isTiffinCancelled ) {
							if(noRiceCount > 0 ){
								noRiceCancellationCount = tiffinCount - overrideCount;
							}
							cancelCount = tiffinCount - overrideCount;
							overrideReportInfo = MealOverridedReportInfo.builder()
									            .firstName(firstName)
									            .count(overrideCount) 
									            .lastName(lastName)
									            .sector(subscriptionSchedule.getZone())
									            .mealCountOverrideType(MealCountOverrideType.CANCEL)
									            .subscriberId(subscriptionSchedule.getSubscriberId())
									            .build(); 
									           
							                                                      
						} else {
							if(noRiceCount > 0) {
								noRiceAdditionCount = overrideCount - tiffinCount; 
							}
				    		additionCount = overrideCount - tiffinCount; 
				    		overrideReportInfo = MealOverridedReportInfo.builder()
						            .firstName(firstName)
						            .count(overrideCount) 
						            .lastName(lastName)
						            .sector(subscriptionSchedule.getZone())
						            .mealCountOverrideType(MealCountOverrideType.ADD)
						            .subscriberId(subscriptionSchedule.getSubscriberId())
						            .build(); 
						           
				    	}
				    	
					} else {
						//Add Regular Non Override to Report
							overrideReportInfo = MealOverridedReportInfo.builder()
					            .firstName(firstName)
					            .count(tiffinCount) 
					            .lastName(lastName)
					            .sector(subscriptionSchedule.getZone())
					            .mealCountOverrideType(MealCountOverrideType.REGULAR)
					            .subscriberId(subscriptionSchedule.getSubscriberId())
					            .build(); 
				
					}
			    	overrideReportInfo.setNoRice(noRiceCount > 0 ? true : false);
			    }
				PackagingInfo packagingInfo = reportData.get(subscriptionSchedule.getZone());
				if(noRiceCount > tiffinCount){
					noRiceCount = tiffinCount;
				}
				packagingInfo = updatePackagingInfo(packagingInfo, tiffinCount, noRiceCount, noRiceCancellationCount, cancelCount, additionCount, noRiceAdditionCount, overrideReportInfo);
				reportData.put(subscriptionSchedule.getZone(), packagingInfo);
			}
		 });
		
				
		return ResponseEntity.ok(reportData);
	}
	
	
	
	
	
	private static PackagingInfo updatePackagingInfo (PackagingInfo packagingInfo, int tiffinCount, int noRiceCount, int noRiceCancellationCount, int cancelCount, int additionCount, int noRiceAdditionCount, MealOverridedReportInfo overrideReportInfo) {
		List<MealOverridedReportInfo> overrideDetailList = null;
		if(packagingInfo == null){
			packagingInfo =  PackagingInfo.builder().build();
		}
		if(packagingInfo.getOverrideDetails() == null){
			overrideDetailList = new ArrayList<MealOverridedReportInfo>();
		} else {
			overrideDetailList = packagingInfo.getOverrideDetails();
		}
		overrideDetailList.add(overrideReportInfo);
		
		packagingInfo.setOverrideDetails(overrideDetailList);
		packagingInfo.setTiffinCount(packagingInfo.getTiffinCount()+tiffinCount);
		packagingInfo.setNoRiceTiffinCount(packagingInfo.getNoRiceTiffinCount()+noRiceCount);
		packagingInfo.setCancellationScheduleCount(packagingInfo.getCancellationScheduleCount()+cancelCount);
		packagingInfo.setAdditionScheduleCount(packagingInfo.getAdditionScheduleCount()+additionCount);
		packagingInfo.setNoRiceCancellationCount(packagingInfo.getNoRiceCancellationCount()+noRiceCancellationCount);
		packagingInfo.setNoRiceAdditionCount(packagingInfo.getNoRiceAdditionCount()+ noRiceAdditionCount);
		return packagingInfo;
	}
		
}
