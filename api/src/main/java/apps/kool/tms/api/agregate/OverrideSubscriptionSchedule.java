package apps.kool.tms.api.agregate;

import java.time.DayOfWeek;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
	private TiffinPersonalization personalization;
	//private WorkFlowStatus status;
}
