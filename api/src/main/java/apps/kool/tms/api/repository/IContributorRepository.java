package apps.kool.tms.api.repository;

import apps.kool.tms.api.agregate.Contributor;
import apps.kool.tms.api.utils.ContributionType;

public interface IContributorRepository {
	
	 Contributor findContributorById(String id);

	
	 Contributor findContributorBySubscriberId(String subscriberId);
	 
	 Contributor findContributorByContributionDateByContributionType(java.util.Date contributionDate, ContributionType contributionType );
	 
	 void save (Contributor contributor);
	 
}
