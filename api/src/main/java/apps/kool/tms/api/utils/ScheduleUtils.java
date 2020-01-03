package apps.kool.tms.api.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;

import apps.kool.tms.api.agregate.Contributor;
import apps.kool.tms.api.agregate.Menu;
import apps.kool.tms.api.agregate.MenuItem;
import apps.kool.tms.api.agregate.Schedule;
import apps.kool.tms.api.agregate.User;
import apps.kool.tms.api.errorhandling.EntityNotFoundException;
import apps.kool.tms.api.repository.IContributorRepository;
import apps.kool.tms.api.repository.IMenuItemRepository;
import apps.kool.tms.api.repository.IMenuRepository;
import apps.kool.tms.api.repository.IScheduleRepository;
import apps.kool.tms.api.repository.UserRepository;
import apps.kool.tms.api.reqres.AddContributorRequest;
import apps.kool.tms.api.reqres.AddMenuRequest;

public class ScheduleUtils {
	public static void addMenuToSchedule(ArrayList<AddMenuRequest> menuRequestList, 
										 IMenuItemRepository menuItemRepository, 
										 IMenuRepository menuRepository, 
										 IScheduleRepository scheduleRepository  ) {
		menuRequestList.forEach(menuRequest -> {
			//Add Menu Items
			ArrayList<MenuItem> menuItems = menuItemRepository.addMeuItems(menuRequest.getMenuItems());
			//Add Menu
			Menu menu ; 
			menu = menuRepository.findMenuByItems(menuItems);
			if(menu == null) {
				menu= Menu.builder().items(menuItems).build();
				menuRepository.saveMenu(menu);
			}
			//Add Menu to Schedule
			try {
				Schedule schedule = scheduleRepository.findByDailyDate(new SimpleDateFormat("yyyy-MM-dd").parse(menuRequest.getMenuDate()));
				if(schedule == null) {
					schedule = Schedule.builder()
										.dailyDate(new SimpleDateFormat("yyyy-MM-dd").parse(menuRequest.getMenuDate()))
										.menu(menu)
										.noMeal(menuRequest.isNoMeal())
										.noMealReason(menuRequest.getNoMealReason())
										.instructionsForSubscriber(menuRequest.getInstructionsForSubscriber())
										.build();
				} else
				{
					schedule.setMenu(menu);
				}
				scheduleRepository.save(schedule);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			
		});
	}
	
	
	public static boolean addOrUpdateContributor(AddContributorRequest contributorRequest, UserRepository users,IScheduleRepository scheduleRepository,IContributorRepository contributorRepository  ) throws ParseException {
		if(contributorRequest != null ) {
			Contributor contributor = null;
			java.util.Date contributionDate = new SimpleDateFormat("yyyy-MM-dd").parse(contributorRequest.getContributionDate());
			User user =  users.findBySubscriberId(contributorRequest.getSubscriberId()).stream().filter(filteredUser -> Objects.equals(contributorRequest.getSubscriberId(),filteredUser.getUsername())).findFirst().orElse(null);
	    	if(user != null){
	    		contributor =  contributorRepository.findContributorByContributionDateByContributionType(contributionDate, contributorRequest.getContributionType());
	    		if(contributor == null ){
		    		contributor = Contributor.builder()
							 .contributionDate(contributionDate)
							 .contributionType(contributorRequest.getContributionType())
							 .messageFromContributor(contributorRequest.getMessageFromContributor())
							 .isContributorAllowedToChooseMenu(contributorRequest.isContributorAllowedToChooseMenu())
							 .user(user)
							 .build();
		    		
	    		} else {
	    			contributor.setUser(user);
	    			contributor.setMessageFromContributor(contributorRequest.getMessageFromContributor());
	    		}
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
				return true;
	    	} else {
	    		throw new  EntityNotFoundException("Cannot find Subscriber "+ contributorRequest.getSubscriberId());
	    	}
	    	
	    }
		
		return false;
	}
}
