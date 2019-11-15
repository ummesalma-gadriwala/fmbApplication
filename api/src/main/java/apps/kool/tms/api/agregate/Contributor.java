package apps.kool.tms.api.agregate;

import lombok.Builder;
import lombok.Data;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import apps.kool.tms.api.utils.ContributionType;

@Builder
@Data
@Document(collection= "contributor")
public class Contributor {
	private  @Id   ObjectId id;
	private  ContributionType type;
	private  String subscriberId;
}
