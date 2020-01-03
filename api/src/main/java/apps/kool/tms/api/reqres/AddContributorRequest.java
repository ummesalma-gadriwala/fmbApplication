package apps.kool.tms.api.reqres;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import apps.kool.tms.api.agregate.InstructionMessage;
import apps.kool.tms.api.utils.ContributionType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddContributorRequest {
	@JsonFormat(pattern="yyyy-MM-dd")
	private String contributionDate;
	private String subscriberId;
	private List<InstructionMessage> messageFromContributor;
	private ContributionType contributionType;
	private boolean isContributorAllowedToChooseMenu; 
}
