package apps.kool.tms.api.agregate;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Document( collection= "previlege")
public class Previlege {
	@JsonIgnore
    private @Id  ObjectId id;
	private String name;
	
	
}