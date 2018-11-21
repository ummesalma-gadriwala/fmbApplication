package apps.kool.tms.api.agregate;
import lombok.Data;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class User {
	
	private @Id  ObjectId id;
	private String userName;
	private String password;
	private String mobileNumber;
	private String additionalInfo; 
	private String hofId;
}
