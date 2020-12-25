package apps.kool.tms.api.repository;

import java.util.List;

import apps.kool.tms.api.agregate.Menu;
import apps.kool.tms.api.agregate.Schedule;

public interface IScheduleRepository  {

	 Schedule findByDailyDate(java.util.Date dailyDate);
	 
	 void save (Schedule schedule);
	 
	 List<Schedule> findByDailyDateBetween(java.util.Date dailyDateGT, java.util.Date dailyDateLT);
	 
	
}
