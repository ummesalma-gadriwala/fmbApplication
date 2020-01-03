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
import apps.kool.tms.api.utils.ScheduleUtils;


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
	    
		ScheduleUtils.addMenuToSchedule(menuRequestList, menuItemRepository, menuRepository, scheduleRepository);
		return ResponseEntity.ok(true);
	}

	
	
	
}
