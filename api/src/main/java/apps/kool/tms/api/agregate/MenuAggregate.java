package apps.kool.tms.api.agregate;

import lombok.Data;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class MenuAggregate {
	private @Id  ObjectId id;
	private ArrayList<MenuItem> items;
}
