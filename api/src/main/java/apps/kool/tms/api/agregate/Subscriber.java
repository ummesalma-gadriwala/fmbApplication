package apps.kool.tms.api.agregate;

import java.sql.Date;
import org.springframework.data.annotation.Id;
import org.bson.types.ObjectId;

import lombok.Data;


@Data
public class Subscriber {
	
	private  @Id  ObjectId id;
	private  TiffinDepot tiffinPickUpInfo;
	private  int noOfTiffins;
	private  Date cancellationStartDate;
	private  Date cancellationEndDate;
	
}	

