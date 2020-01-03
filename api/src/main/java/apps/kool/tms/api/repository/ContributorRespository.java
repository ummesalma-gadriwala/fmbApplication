package apps.kool.tms.api.repository;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import apps.kool.tms.api.agregate.Contributor;
import apps.kool.tms.api.utils.ContributionType;


@Repository
public class ContributorRespository implements IContributorRepository {

	private final MongoTemplate mongoTemplate;
	
    @Autowired
    public ContributorRespository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

	@Override
	public Contributor findContributorBySubscriberId(String subscriberId) {
	   Query query = new Query();
	   query.addCriteria(Criteria.where("subscriberId").is(subscriberId));
	   Contributor contributor = mongoTemplate.findOne(query, Contributor.class);
		return contributor;
	}

	@Override
	public void save(Contributor contributor) {
		mongoTemplate.save(contributor);
	}

	@Override
	public Contributor findContributorById(String id) {
	   Query query = new Query();
	   query.addCriteria(Criteria.where("_id").is(id));
	   Contributor contributor = mongoTemplate.findOne(query, Contributor.class);
	   return contributor;
	}

	@Override
	public Contributor findContributorByContributionDateByContributionType(Date contributionDate, ContributionType contributionType) {
		Query query = new Query();
		query.addCriteria(Criteria.where("contributionDate").is(contributionDate)
						  .andOperator(Criteria.where("contributionType").is(contributionType.name()))		  
						  );
		Contributor contributor = mongoTemplate.findOne(query, Contributor.class);
		return contributor;
		
	}

}
