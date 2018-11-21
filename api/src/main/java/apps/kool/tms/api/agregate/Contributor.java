package apps.kool.tms.api.agregate;

import lombok.Data;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;


@Data
public class Contributor {
	private  @Id   ObjectId id;
	private  ContributionAttribute contributionAttribute;
}
