package apps.kool.tms.api.repository;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;


import org.springframework.stereotype.Repository;


import apps.kool.tms.api.agregate.SubscriberPushNotification;

@Repository
public class SubscriberPushNotificationRepository implements ISubscriberPushNotificationRepository {
	
	private final MongoTemplate mongoTemplate;

	@Autowired
    public SubscriberPushNotificationRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

	@Override
	public SubscriberPushNotification saveSubscriberPushNotification(SubscriberPushNotification subscriberPushNotification) {
		Query query = new Query();
		query.addCriteria(Criteria.where("username").is(subscriberPushNotification.getUsername()));
		SubscriberPushNotification subscriberPushNotificationDb = mongoTemplate.findOne(query, SubscriberPushNotification.class);
		subscriberPushNotificationDb.setPushNotificationAuth(subscriberPushNotification.getPushNotificationAuth());
		subscriberPushNotificationDb.setPushNotificationEndpoint(subscriberPushNotification.getPushNotificationEndpoint());
		subscriberPushNotificationDb.setPushNotificationKey(subscriberPushNotification.getPushNotificationKey());
		mongoTemplate.save(subscriberPushNotificationDb, "subscriberPushNotification");
		return subscriberPushNotificationDb;
	}

	@Override
	public List<SubscriberPushNotification> getAllSubscriberPushNotification() {
		List<SubscriberPushNotification> subscriberPushNotifications = mongoTemplate.findAll(SubscriberPushNotification.class);
		return subscriberPushNotifications;
	}

	@Override
	public SubscriberPushNotification getSubscriberPushNotification(String subscriberId) {
		Query query = new Query();
		query.addCriteria(Criteria.where("subscriberId").is(subscriberId));
		SubscriberPushNotification subscriberPushNotifications = mongoTemplate.findOne(query, SubscriberPushNotification.class);
		return subscriberPushNotifications;
	}

}
