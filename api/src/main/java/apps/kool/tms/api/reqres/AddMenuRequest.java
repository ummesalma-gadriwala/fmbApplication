package apps.kool.tms.api.reqres;

import java.util.ArrayList;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonFormat;
import apps.kool.tms.api.agregate.MenuItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
public class AddMenuRequest {
	
	@JsonFormat(pattern="yyyy-MM-dd")
	private String menuDate;
	private ArrayList<MenuItem> menuItems;
	private boolean noMeal;
	private String  noMealReason;
}
