package apps.kool.tms.api.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import apps.kool.tms.api.agregate.SubscriberPushNotification;
import apps.kool.tms.api.pushnotification.PushNotificationService;
import apps.kool.tms.api.repository.SubscriberPushNotificationRepository;
import apps.kool.tms.api.reqres.PushNotificationRequest;

@RestController
@RequestMapping("/pushnotification")
public class PushNotificationController {
	
	@Autowired
    private SubscriberPushNotificationRepository subscriberPushNotificationRepository;
	
	@Autowired
	private PushNotificationService pushNotificationService;
	
	@RequestMapping(value="/profile", method= RequestMethod.POST)
    public ResponseEntity<SubscriberPushNotification> geSubscriberById(SubscriberPushNotification subscriberPushNotification) {
		SubscriberPushNotification subscriberPushNotificationDb = subscriberPushNotificationRepository.saveSubscriberPushNotification(subscriberPushNotification);
    	return ResponseEntity.ok(subscriberPushNotificationDb);
    }
	
//	@RequestMapping(value="/push", method= RequestMethod.POST)
//    public ResponseEntity<SubscriberPushNotification> geSubscriberById(PushNotificationRequest subscriberPushNotification) {
//		SubscriberPushNotification subscriberPushNotificationDb = subscriberPushNotificationRepository.saveSubscriberPushNotification(subscriberPushNotification);
//    	return ResponseEntity.ok(subscriberPushNotificationDb);
//    }
	
	
}
