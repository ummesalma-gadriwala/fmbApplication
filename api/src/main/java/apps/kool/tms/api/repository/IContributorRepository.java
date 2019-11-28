package apps.kool.tms.api.repository;

import apps.kool.tms.api.agregate.Contributor;

public interface IContributorRepository {
	
	 Contributor findContributorById(String id);

	
	 Contributor findContributorBySubscriberId(String subscriberId);
	 
	 void save (Contributor contributor);
	 
}
