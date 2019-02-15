package apps.kool.tms.api.agregate;

import java.sql.Date;
import java.time.DayOfWeek;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import apps.kool.tms.api.utils.ScheduleOverrideType;
import apps.kool.tms.api.utils.WorkFlowStatus;
import lombok.Data;

@Data
@Document(collection= "overrideSubscriptionSchedule")
@CompoundIndexes({
    @CompoundIndex(name = "subscriptionScheduleId_overrideStartDate", unique = true,  def = "{'subscriptionScheduleId' : 1, 'overrideStartDate': 1}")
})
public class OverrideSubscriptionSchedule {
	@JsonIgnore
	private @Id  ObjectId id;
	private String subscriptionScheduleId; 
	//private ScheduleOverrideType overRideType;
	@JsonFormat(pattern="yyyy-MM-dd")
	private java.util.Date overrideStartDate;
	@JsonFormat(pattern="yyyy-MM-dd")
	private java.util.Date overrideEndDate;
	private  Map <DayOfWeek, Integer> weeklyOverrideSchedule;
	//private WorkFlowStatus status;
}
