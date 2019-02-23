package apps.kool.tms.api.agregate;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Document( collection= "role")
public class Role {
	@JsonIgnore
    private @Id  ObjectId id;
	private String name;
	@DBRef
	private List<Previlege> previleges;
}
