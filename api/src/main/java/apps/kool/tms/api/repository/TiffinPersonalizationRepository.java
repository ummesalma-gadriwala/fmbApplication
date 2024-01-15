package apps.kool.tms.api.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import apps.kool.tms.api.agregate.TiffinPersonalization;;

@Repository
public class TiffinPersonalizationRepository implements ITiffinPersonalizationRepository {
	
    private final MongoTemplate mongoTemplate;
	
    @Autowired
    public TiffinPersonalizationRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

	@Override
	public List<TiffinPersonalization> getPersonlizations() {
		Query query = new Query();
		List<TiffinPersonalization> tiffinPersonalizations = mongoTemplate.find(query, TiffinPersonalization.class);
		return tiffinPersonalizations;
	}

	@Override
	public TiffinPersonalization getPersonlizationBySubscriberId(String subscriberId) {
		Query personalizationQuery = new Query();
		personalizationQuery.addCriteria(Criteria.where("subscriberId").is(subscriberId));
		TiffinPersonalization personalization = mongoTemplate.findOne(personalizationQuery, TiffinPersonalization.class);
		return personalization;
	}

	

	    

}
