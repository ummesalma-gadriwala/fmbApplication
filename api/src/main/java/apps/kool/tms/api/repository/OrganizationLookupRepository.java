package apps.kool.tms.api.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import apps.kool.tms.api.agregate.OrganizationLookup;

@Repository
public class OrganizationLookupRepository implements IOrganizationLookupRepository {
	
	private final MongoTemplate mongoTemplate;
	
    @Autowired
    public OrganizationLookupRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

	@Override
	public List<OrganizationLookup> getOrganizationLookupByOrgCode(String orgCode) {
		Query organizationLookUpQuery = new Query();
		organizationLookUpQuery.addCriteria(Criteria.where("orgCode").is(orgCode));
		List<OrganizationLookup> organizations = mongoTemplate.find(organizationLookUpQuery, OrganizationLookup.class);
		return organizations;
	}


}
