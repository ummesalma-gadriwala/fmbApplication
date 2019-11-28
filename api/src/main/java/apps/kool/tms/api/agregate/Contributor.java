package apps.kool.tms.api.agregate;

import lombok.Builder;
import lombok.Data;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import apps.kool.tms.api.utils.ContributionType;

@Builder
@Data
@Document(collection= "contributor")
@CompoundIndexes({
    @CompoundIndex(name = "subscriberId_contributionDate_contributionType", unique = true,  def = "{'subscriberId' : 1, 'contributionDate': 1, 'contributionType': 1}")
})
public class Contributor {
	
	@JsonIgnore
	private  @Id  ObjectId id;
	@DBRef
	private  User user;
	@JsonFormat(pattern="yyyy-MM-dd")
	private java.util.Date contributionDate;
	private List<InstructionMessage> messageFromContributor;
	private ContributionType contributionType;
	private boolean isContributorAllowedToChooseMenu ;
}
