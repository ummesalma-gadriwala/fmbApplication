package apps.kool.tms.api.repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import apps.kool.tms.api.agregate.OverrideSubscriptionSchedule;
import apps.kool.tms.api.agregate.SubscriptionSchedule;

@Repository
public class SubscriberScheduleRepository implements ISubscriberScheduleRepository {
	
	private final MongoTemplate mongoTemplate;
	
    @Autowired
    public SubscriberScheduleRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

	@Override
	public SubscriptionSchedule saveSubscriptionSchedule(SubscriptionSchedule subscriptionSchedule) {
		if(subscriptionSchedule != null && subscriptionSchedule.getOverrideSchedule()!=null){
			subscriptionSchedule.getOverrideSchedule().forEach(overrideSchedule -> mongoTemplate.save(overrideSchedule));
		}
		mongoTemplate.save(subscriptionSchedule);
		return subscriptionSchedule;
	}

	@Override
	public List<SubscriptionSchedule> getAllSubscriptionSchedule() {
		return mongoTemplate.findAll(SubscriptionSchedule.class);
	}

	@Override
	public SubscriptionSchedule getSubscriptionScheduleBySubscriberId(String subscriberId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("subscriberId").is(subscriberId));
		SubscriptionSchedule subscriptionSchedule = mongoTemplate.findOne(query, SubscriptionSchedule.class);
		return subscriptionSchedule;
	}

	@Override
	public OverrideSubscriptionSchedule updateOverrideSchedule(String subscriberId,OverrideSubscriptionSchedule overrideSubscriptionSchedule) {
		SubscriptionSchedule subscriptionSchedule = getSubscriptionScheduleBySubscriberId(subscriberId);
	    if(subscriptionSchedule.getOverrideSchedule().contains(overrideSubscriptionSchedule)) {
	    	subscriptionSchedule.getOverrideSchedule().stream().forEach(fetchedOverride -> {
	    		if(fetchedOverride.getOverrideEndDate().equals(overrideSubscriptionSchedule.getOverrideEndDate()) &&
	    				fetchedOverride.getOverrideStartDate().equals(overrideSubscriptionSchedule.getOverrideStartDate())){
	    			       fetchedOverride.setWeeklyOverrideSchedule(overrideSubscriptionSchedule.getWeeklyOverrideSchedule());
	    		}
	    	});
	    	mongoTemplate.save(subscriptionSchedule);
			return overrideSubscriptionSchedule;
	    }
	    return null;
	}
	
	
	public boolean deleteOverrideSchedule(String subscriberId, String startDate) throws Exception {
		Date dateStartDate =new SimpleDateFormat("yyyy-MM-dd").parse(startDate);
		SubscriptionSchedule subscriptionSchedule = getSubscriptionScheduleBySubscriberId(subscriberId);
		if(subscriptionSchedule!=null) {
	    	Optional<OverrideSubscriptionSchedule> delOverrideSchedule = subscriptionSchedule.getOverrideSchedule().stream().filter(fetchedOverride -> 
	    							 fetchedOverride.getOverrideStartDate().equals(dateStartDate)				
				).findFirst();
	    	if(delOverrideSchedule.isPresent()){
	    		mongoTemplate.remove(new Query(Criteria.where("id").is(delOverrideSchedule.get().getId())), OverrideSubscriptionSchedule.class);
	    		subscriptionSchedule.getOverrideSchedule().remove(delOverrideSchedule.get());
	    		mongoTemplate.save(subscriptionSchedule);
		    	return true;
	    	}
	       	
	    }
		
	    return false;
	}


	@Override
	public SubscriptionSchedule updateSubscriptionSchedule(SubscriptionSchedule subscriptionSchedule) {
		
		return null;
	}

	@Override
	public SubscriptionSchedule addSubscriptionSchedule(String subscriptionId,
			OverrideSubscriptionSchedule overrideSubscriptionSchedule) {
		SubscriptionSchedule subscriptionSchedule = getSubscriptionScheduleBySubscriberId(subscriptionId);
		overrideSubscriptionSchedule.setSubscriptionScheduleId(subscriptionSchedule.getId().toString());
		mongoTemplate.save(overrideSubscriptionSchedule);
		if(subscriptionSchedule.getOverrideSchedule()==null) {
			List<OverrideSubscriptionSchedule> overrideList = new ArrayList<OverrideSubscriptionSchedule>();
			overrideList.add(overrideSubscriptionSchedule);
			subscriptionSchedule.setOverrideSchedule(overrideList);
		} else {
			subscriptionSchedule.getOverrideSchedule().add(overrideSubscriptionSchedule);
		}
		
		mongoTemplate.save(subscriptionSchedule);
		
		return getSubscriptionScheduleBySubscriberId(subscriptionId);
	}

}
