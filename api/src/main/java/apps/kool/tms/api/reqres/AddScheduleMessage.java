package apps.kool.tms.api.reqres;

import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonFormat;
import apps.kool.tms.api.agregate.InstructionMessage;
import lombok.Data;

@Data
public class AddScheduleMessage {
	
	@JsonFormat(pattern="yyyy-MM-dd")
	private String scheduleDate;
	private ArrayList<InstructionMessage> instructionsForSubscriber;

}
