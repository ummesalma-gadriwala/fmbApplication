package apps.kool.tms.api.resources;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.agregate.Menu;
import apps.kool.tms.api.agregate.MenuItem;
import apps.kool.tms.api.agregate.Schedule;
import apps.kool.tms.api.repository.IMenuItemRepository;
import apps.kool.tms.api.repository.IMenuRepository;
import apps.kool.tms.api.repository.IScheduleRepository;
import apps.kool.tms.api.reqres.AddMenuRequest;


@RestController
@RequestMapping("/menu")
public class MenuController {
	
	@Autowired
	IMenuItemRepository menuItemRepository;
	
	@Autowired
	IMenuRepository menuRepository;
	
	@Autowired
	IScheduleRepository scheduleRepository;

	//@PreAuthorize("hasRole('FMB_ROLE_OPERATIONS')")
	@RequestMapping( value = "/schedule",  method = RequestMethod.POST)
	ResponseEntity<Boolean> add(@RequestBody ArrayList<AddMenuRequest> menuRequestList ) throws ParseException {
	    
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
		return ResponseEntity.ok(true);
	}
	
	
}
