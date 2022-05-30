package apps.kool.tms.api.pushnotification;

import java.security.GeneralSecurityException;

import org.springframework.stereotype.Service;

import apps.kool.tms.api.agregate.SubscriberPushNotification;

@Service
public interface IPushNotificationService {
    public boolean updatePushNotificationInformation(SubscriberPushNotification subscriberPushNotification);
    public void sendPushMessage(SubscriberPushNotification subscriberPushNotification, byte[] payload) throws GeneralSecurityException;
}
