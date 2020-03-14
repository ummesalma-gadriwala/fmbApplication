package apps.kool.tms.api.agregate;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;


import lombok.Builder;
import lombok.Data;

@Builder
@Data
@Document("tiffinPersonalization")
public class TiffinPersonalization {
	
	private @Id @JsonProperty  ObjectId _id;
	private ObjectId subscriptionScheduleId;
	private String subscriberId;
	private RicePersonalization noRice;
	
}
