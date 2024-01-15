package apps.kool.tms.api.resources;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeSet;
import java.util.concurrent.CompletableFuture;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.agregate.OverrideSubscriptionSchedule;
import apps.kool.tms.api.agregate.PackageType;
import apps.kool.tms.api.agregate.PackagingCountInfo;
import apps.kool.tms.api.agregate.PackagingInfo;
import apps.kool.tms.api.agregate.SubscriptionSchedule;
import apps.kool.tms.api.agregate.TiffinPersonalization;
import apps.kool.tms.api.agregate.MealOverridedReportInfo;
import apps.kool.tms.api.agregate.OrganizationLookup;
import apps.kool.tms.api.repository.IOrganizationLookupRepository;
import apps.kool.tms.api.repository.ISubscriberScheduleRepository;
import apps.kool.tms.api.repository.ITiffinPersonalizationRepository;
import apps.kool.tms.api.utils.MealCountOverrideType;
import apps.kool.tms.api.utils.SectorName;

import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toCollection;

@RestController
@RequestMapping("/admin")
public class AdminReportController {
	
	@Autowired
	ISubscriberScheduleRepository subscriberScheduleRepository; 
	
	@Autowired
	ITiffinPersonalizationRepository tiffinPersonalizationRepository; 
	
	@Autowired
	IOrganizationLookupRepository  organizationLookupRepository;
		
	@RequestMapping(method = RequestMethod.GET, value = "sector/meal/count/{selectedDate}")
	ResponseEntity<Map<SectorName, PackagingInfo>> dailyThaliCountBySector(@PathVariable String selectedDate ) throws Exception {
		LocalDate localDateSelectedDate = LocalDate.parse(selectedDate);
		CompletableFuture<List <SubscriptionSchedule>> subscriptionSchedules = subscriberScheduleRepository.getAllSubscriptionScheduleWithUserAsync();
		List <TiffinPersonalization> personalizations =  tiffinPersonalizationRepository.getPersonlizations();
		List <OrganizationLookup>  aefListIds = organizationLookupRepository.getOrganizationLookupByOrgCode("AEF");
		Map<String, OrganizationLookup> aefIdLookupBySubscriberId = convertList(aefListIds);
		CompletableFuture<List<OverrideSubscriptionSchedule>> overrideSubscriptionAsyncSchedules = subscriberScheduleRepository.getOverrideScheduledForDateAsync(selectedDate);
		Map<SectorName, PackagingInfo> reportData = new HashMap<SectorName, PackagingInfo>();
		
	    CompletableFuture.allOf(subscriptionSchedules,overrideSubscriptionAsyncSchedules).join();

	    List<OverrideSubscriptionSchedule> overrideSubscriptionSchedules = overrideSubscriptionAsyncSchedules.get();
		if(subscriptionSchedules == null || subscriptionSchedules.get().isEmpty())	return ResponseEntity.ok(reportData);
		
		subscriptionSchedules.get().forEach(subscriptionSchedule -> {
			int tiffinCount = 0;
			int noRiceCount = 0;
			int cancelCount = 0;
			int noRiceCancellationCount =0 ;
			int noRiceAdditionCount = 0;
			int additionCount = 0;
			MealOverridedReportInfo overrideReportInfo= null;
			String firstName = subscriptionSchedule.getUser() != null? subscriptionSchedule.getUser().getFirstName() : null;
			String lastName = subscriptionSchedule.getUser() != null? subscriptionSchedule.getUser().getLastName() : null;

			if(subscriptionSchedule.getOptedSchedule().get(localDateSelectedDate.getDayOfWeek()) != null) {
				
				tiffinCount =  subscriptionSchedule.getOptedSchedule().get(localDateSelectedDate.getDayOfWeek());
				
				Optional<TiffinPersonalization> tiffinPersonalization = personalizations.stream().filter(personalization -> 
					personalization.getSubscriptionScheduleId().toString().equals(subscriptionSchedule.getId().toString())
				).findFirst();
				
				if(tiffinPersonalization.isPresent() && tiffinPersonalization.get().getNoRice() != null && tiffinPersonalization.get().getNoRice().isActivate()) {
					noRiceCount = tiffinCount;
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
						//System.out.println( subscriptionSchedule.getSubscriberId()  + " -" +tiffinCount + " -" + overrideCount);
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
				PackagingInfo zonewisePackagingInfo = reportData.get(subscriptionSchedule.getZone());
				if(noRiceCount > tiffinCount){
					noRiceCount = tiffinCount;
				}
				zonewisePackagingInfo = updatePackagingInfo(zonewisePackagingInfo, tiffinCount, noRiceCount, noRiceCancellationCount, cancelCount, additionCount, noRiceAdditionCount, overrideReportInfo);
				reportData.put(subscriptionSchedule.getZone(), zonewisePackagingInfo);
			}
		 });
		
				
		return ResponseEntity.ok(reportData);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "v2/sector/meal/count/{selectedDate}")
	ResponseEntity<Map<SectorName, PackagingInfo>> dailyThaliCountBySectorPackageType(@PathVariable String selectedDate ) throws Exception {
		Map<SectorName, PackagingInfo> reportData = new HashMap<SectorName, PackagingInfo>();
		
		LocalDate localDateSelectedDate = LocalDate.parse(selectedDate);
		CompletableFuture<List <SubscriptionSchedule>> subscriptionSchedules = subscriberScheduleRepository.getAllSubscriptionScheduleWithUserAsync();
		if(subscriptionSchedules == null || subscriptionSchedules.get().isEmpty())	return ResponseEntity.ok(reportData);
		
		List <TiffinPersonalization> personalizations =  tiffinPersonalizationRepository.getPersonlizations();
		CompletableFuture<List<OverrideSubscriptionSchedule>> overrideSubscriptionAsyncSchedules = subscriberScheduleRepository.getOverrideScheduledForDateAsync(selectedDate);
		
	    CompletableFuture.allOf(subscriptionSchedules,overrideSubscriptionAsyncSchedules).join();

	    List<OverrideSubscriptionSchedule> overrideSubscriptionSchedules = overrideSubscriptionAsyncSchedules.get();
	    
		List <OrganizationLookup>  aefListIds = organizationLookupRepository.getOrganizationLookupByOrgCode("AEF");
		Map<String, OrganizationLookup> aefIdLookupBySubscriberId = convertList(aefListIds);
		
		subscriptionSchedules.get().forEach(subscriptionSchedule -> {
			int tiffinCount = 0;
			int cancelCount = 0;
			int additionCount = 0;
			MealOverridedReportInfo overrideReportInfo= null;
			boolean isTiffinCancelled = false;
			String firstName = subscriptionSchedule.getUser() != null? subscriptionSchedule.getUser().getFirstName() : null;
			String lastName = subscriptionSchedule.getUser() != null? subscriptionSchedule.getUser().getLastName() : null;

			if(subscriptionSchedule.getOptedSchedule().get(localDateSelectedDate.getDayOfWeek()) != null) {
				
				tiffinCount =  subscriptionSchedule.getOptedSchedule().get(localDateSelectedDate.getDayOfWeek());
				
				Optional<TiffinPersonalization> tiffinPersonalization = personalizations.stream().filter(personalization -> 
					personalization.getSubscriptionScheduleId().toString().equals(subscriptionSchedule.getId().toString())
				).findFirst();
							
				Optional<OverrideSubscriptionSchedule> filteredOverrideSubscriptionSchedule = overrideSubscriptionSchedules.stream().filter(overrideSubscriptionSchedule -> 
					      overrideSubscriptionSchedule.getSubscriptionScheduleId().equals(subscriptionSchedule.getId().toString())
						).findFirst();
				
				if(subscriptionSchedule.getZone()!=null && subscriptionSchedule.getOptedSchedule().get(localDateSelectedDate.getDayOfWeek())!=null){
			    	Integer overrideCount = null;
			    	overrideReportInfo= null;
			    	MealCountOverrideType mealOverrideType = null;
			    	if(filteredOverrideSubscriptionSchedule.isPresent()) {
						overrideCount =  filteredOverrideSubscriptionSchedule.get().getWeeklyOverrideSchedule().get(localDateSelectedDate.getDayOfWeek());
						isTiffinCancelled = tiffinCount > overrideCount;
						mealOverrideType = (!filteredOverrideSubscriptionSchedule.isPresent()) ? MealCountOverrideType.REGULAR 
                                : isTiffinCancelled ? MealCountOverrideType.CANCEL : MealCountOverrideType.ADD;
                        switch (mealOverrideType) {
                        case ADD:
							additionCount = overrideCount - tiffinCount;
				    		overrideReportInfo = setOverrideInfo(subscriptionSchedule, overrideCount, firstName,lastName,mealOverrideType,tiffinPersonalization.get(), aefIdLookupBySubscriberId.get(subscriptionSchedule.getSubscriberId()));

							break;
						case CANCEL:
							cancelCount = tiffinCount - overrideCount;	
				    		overrideReportInfo = setOverrideInfo(subscriptionSchedule, overrideCount, firstName,lastName,mealOverrideType,tiffinPersonalization.get(),aefIdLookupBySubscriberId.get(subscriptionSchedule.getSubscriberId()));
							break;
						default:
							break;
						}
			    	} else {
			    		overrideReportInfo = setOverrideInfo(subscriptionSchedule, tiffinCount, firstName,lastName,MealCountOverrideType.REGULAR,tiffinPersonalization.get(),aefIdLookupBySubscriberId.get(subscriptionSchedule.getSubscriberId()));
			    	}
			    	
			    }
				PackagingInfo zonewisePackagingInfo = reportData.get(subscriptionSchedule.getZone());
				zonewisePackagingInfo = updatePackagingInfo(zonewisePackagingInfo, tiffinPersonalization.get().getPackageType(), tiffinCount, cancelCount, additionCount, overrideReportInfo);
				reportData.put(subscriptionSchedule.getZone(), zonewisePackagingInfo);
			}
		 });
		return ResponseEntity.ok(reportData);
	}

	private MealOverridedReportInfo setOverrideInfo(SubscriptionSchedule subscriptionSchedule, 
					int tiffinCount,String firstName, String lastName,
					MealCountOverrideType mealOverrideType, 
					TiffinPersonalization personalization, OrganizationLookup aefOrganizationLookup) {
		MealOverridedReportInfo overrideReportInfo;
		overrideReportInfo = MealOverridedReportInfo.builder()
		.firstName(firstName)
		.count(tiffinCount) 
		.lastName(lastName)
		.sector(subscriptionSchedule.getZone())
		.mealCountOverrideType(mealOverrideType)
		.subscriberId(subscriptionSchedule.getSubscriberId())
		.packageType(personalization.getPackageType())
		.aefOrganizationLookup(aefOrganizationLookup)
		.build();
		return overrideReportInfo;
	}


	private static Map<String, OrganizationLookup> convertList(List<OrganizationLookup> list) {
		
		List<OrganizationLookup> unique = list.stream()
                .collect(collectingAndThen(toCollection(() -> new TreeSet<>(comparing(OrganizationLookup::getSubscriberId))),
                                           ArrayList::new));
		
	    Map<String, OrganizationLookup> map = unique.stream()
	      .collect(Collectors.toMap(OrganizationLookup::getSubscriberId, Function.identity()));
	    return map;
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
	
	private static PackagingInfo updatePackagingInfo (PackagingInfo zonewisePackagingInfo, PackageType packageType, int tiffinCount, int cancelCount, int additionCount, MealOverridedReportInfo overrideReportInfo) {
		List<MealOverridedReportInfo> overrideDetailList = null;
		if(zonewisePackagingInfo == null){
			zonewisePackagingInfo =  PackagingInfo.builder().build();
		}
		if(zonewisePackagingInfo.getOverrideDetails() == null){
			overrideDetailList = new ArrayList<MealOverridedReportInfo>();
		} else {
			overrideDetailList = zonewisePackagingInfo.getOverrideDetails();
		}
		overrideDetailList.add(overrideReportInfo);
		Map<PackageType, PackagingCountInfo> zoneWisePackageTypeTiffinCount = zonewisePackagingInfo.getPackageTypeTiffinCount();
		if(zoneWisePackageTypeTiffinCount == null ){
			zoneWisePackageTypeTiffinCount = new HashMap<PackageType, PackagingCountInfo>();
			zoneWisePackageTypeTiffinCount.put(packageType, PackagingCountInfo.builder().build());
			zonewisePackagingInfo.setPackageTypeTiffinCount(zoneWisePackageTypeTiffinCount);
		}
		if(zonewisePackagingInfo.getPackageTypeTiffinCount().get(packageType) == null){
			zonewisePackagingInfo.getPackageTypeTiffinCount().put(packageType, PackagingCountInfo.builder().build());
		}
		PackagingCountInfo zonewisePackagingCountInfo = zonewisePackagingInfo.getPackageTypeTiffinCount().get(packageType);
		zonewisePackagingCountInfo.setActualCount(zonewisePackagingCountInfo.getActualCount()+tiffinCount);
		zonewisePackagingCountInfo.setAdditionCount(zonewisePackagingCountInfo.getAdditionCount()+ additionCount);
		zonewisePackagingCountInfo.setCancellationCount(zonewisePackagingCountInfo.getCancellationCount()+cancelCount);
		zonewisePackagingInfo.setOverrideDetails(overrideDetailList);
		zonewisePackagingInfo.getPackageTypeTiffinCount().put(packageType, zonewisePackagingCountInfo);
		return zonewisePackagingInfo;
	}
		
}
