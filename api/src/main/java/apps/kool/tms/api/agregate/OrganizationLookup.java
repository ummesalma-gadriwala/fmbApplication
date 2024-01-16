package apps.kool.tms.api.agregate;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Document("organizationLookup")
public class OrganizationLookup {
	@JsonIgnore
	private @Id  ObjectId id;
	private String subscriberId; //hof
	private String orgId;
	private String orgCode;

}
