package apps.kool.tms.api.resources;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.agregate.InstructionMessage;
import apps.kool.tms.api.agregate.Menu;
import apps.kool.tms.api.agregate.MenuItem;
import apps.kool.tms.api.agregate.Schedule;
import apps.kool.tms.api.repository.IScheduleRepository;
import apps.kool.tms.api.reqres.AddMenuRequest;
import apps.kool.tms.api.reqres.AddScheduleMessage;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
	
	@Autowired
	IScheduleRepository scheduleRepository;

	@RequestMapping( value = "/month" , method = RequestMethod.GET)
	ResponseEntity<List<Schedule>> getSchedule()   {
	   return ResponseEntity.ok(scheduleRepository.findByDailyDateBetween(java.sql.Date.valueOf(LocalDate.now().minusDays(15)), 
																			java.sql.Date.valueOf(LocalDate.now().plusDays(15))	
								));
	}
	
	
	//@PreAuthorize("hasRole('FMB_ROLE_OPERATIONS')")
	@RequestMapping( value = "/message",  method = RequestMethod.PUT)
	ResponseEntity<Boolean> add(@RequestBody AddScheduleMessage  addScheduleMesaageRequest ) throws ParseException {
	    //Add Instructions to Schedule
		try {
			Schedule schedule = scheduleRepository.findByDailyDate(new SimpleDateFormat("yyyy-MM-dd").parse(addScheduleMesaageRequest.getScheduleDate()));
			if(schedule == null) {
				schedule = Schedule.builder()
									.dailyDate(new SimpleDateFormat("yyyy-MM-dd").parse(addScheduleMesaageRequest.getScheduleDate()))
									.instructionsForSubscriber(addScheduleMesaageRequest.getInstructionsForSubscriber())
									.build();
			} else
			{
			  schedule.setInstructionsForSubscriber(addScheduleMesaageRequest.getInstructionsForSubscriber());
			}
			scheduleRepository.save(schedule);
		} catch (ParseException e) {
			e.printStackTrace();
		}
			
		
		return ResponseEntity.ok(true);
	}

}
