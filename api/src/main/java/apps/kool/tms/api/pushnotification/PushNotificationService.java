package apps.kool.tms.api.pushnotification;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.spec.InvalidKeySpecException;
import java.util.concurrent.ExecutionException;

import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import apps.kool.tms.api.agregate.SubscriberPushNotification;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;

@Service
public class PushNotificationService implements IPushNotificationService {
	private static final int TTL = 255;
	@Autowired
    Environment environment;
    

	@Override
	public boolean updatePushNotificationInformation(SubscriberPushNotification subscriberPushNotification) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void sendPushMessage(SubscriberPushNotification subscriberPushNotification, byte[] payload) throws GeneralSecurityException {
		PushService pushService;
		Notification notification = new Notification(
				subscriberPushNotification.getPushNotificationEndpoint(),
				subscriberPushNotification.getUserPublicKey(),
				subscriberPushNotification.getAuthAsBytes(),
	      payload,
	      TTL
	    );
	    // Instantiate the push service with a GCM API key
	    pushService = new PushService(environment.getProperty("gcm-api-key"));
	    try {
			pushService.send(notification);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (JoseException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
	}


	
}
