package apps.kool.tms.api.agregate;

import lombok.Data;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class MenuItem {
	private @Id  ObjectId id;
	private String itemName;
	private double costPerThali;
}
