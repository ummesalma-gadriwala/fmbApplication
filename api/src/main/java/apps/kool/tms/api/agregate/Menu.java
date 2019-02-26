package apps.kool.tms.api.agregate;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Builder
@Data
@Document
public class Menu {
	
	@JsonIgnore
	private @Id  ObjectId id;
	@DBRef
	@Indexed(unique = true)
	private ArrayList<MenuItem> items;
}
