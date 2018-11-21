package apps.kool.tms.api.agregate;

import java.util.ArrayList;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import lombok.Data;

@Data
public class TiffinSector {
	private  @Id ObjectId id;
	private  String sectorName;
	private ArrayList<TiffinDepot> depots;
	
}
