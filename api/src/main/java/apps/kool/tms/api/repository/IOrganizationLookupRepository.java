package apps.kool.tms.api.repository;

import java.util.List;
import apps.kool.tms.api.agregate.OrganizationLookup;

public interface IOrganizationLookupRepository {
	
	List<OrganizationLookup> getOrganizationLookupByOrgCode(String orgCode);

}
