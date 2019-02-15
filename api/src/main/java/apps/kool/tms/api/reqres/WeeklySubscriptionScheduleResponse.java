package apps.kool.tms.api.reqres;

import java.sql.Date;
import java.time.DayOfWeek;
import java.util.Map;

import lombok.Data;

@Data
public class WeeklySubscriptionScheduleResponse extends APIResponse{
	
	//key = Date  First Day of Week
	// value = Map of key = DayOfWeek , value = countofMeal
	private Map<Date, Map<DayOfWeek, Integer>> weeklySubscriptionSchedule;

}
