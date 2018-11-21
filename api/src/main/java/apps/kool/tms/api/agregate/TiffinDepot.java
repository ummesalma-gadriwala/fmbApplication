package apps.kool.tms.api.agregate;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class TiffinDepot {
	 private @Id  ObjectId id;
	 private String depotName;
	 private ObjectId sectorId; 
	 
}
