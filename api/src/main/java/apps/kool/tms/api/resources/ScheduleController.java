package apps.kool.tms.api.resources;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.agregate.Schedule;
import apps.kool.tms.api.repository.IScheduleRepository;

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

}
