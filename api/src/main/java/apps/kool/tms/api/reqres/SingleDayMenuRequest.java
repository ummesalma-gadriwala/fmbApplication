package apps.kool.tms.api.reqres;

import com.fasterxml.jackson.annotation.JsonFormat;

import apps.kool.tms.api.agregate.MenuItem;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class SingleDayMenuRequest {
	@JsonFormat(pattern="yyyy-MM-dd")
	private java.util.Date menuDate;
	private MenuItem[] menuItems;
	private boolean noMeal;
	private String  noMealReason;
}
