package apps.kool.tms.api.repository;

import java.util.List;

import apps.kool.tms.api.agregate.SubscriberPushNotification;

public interface ISubscriberPushNotificationRepository {
	
	SubscriberPushNotification saveSubscriberPushNotification(SubscriberPushNotification subscriberPushNotification);
	
	List<SubscriberPushNotification> getAllSubscriberPushNotification();
	
	SubscriberPushNotification getSubscriberPushNotification (String subscriberId);
	
	
	   
	   

}
