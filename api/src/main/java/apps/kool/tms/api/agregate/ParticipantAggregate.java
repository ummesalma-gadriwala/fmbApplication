package apps.kool.tms.api.agregate;

import lombok.Data;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class ParticipantAggregate {
	private @Id  ObjectId id;
	//private String userName;
	private ObjectId userId;
	private Subscriber subscriber;
	private Contributor contributor;
}
