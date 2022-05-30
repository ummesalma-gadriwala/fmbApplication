package apps.kool.tms.api.reqres;

import apps.kool.tms.api.utils.PushNotificationType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PushNotificationRequest {
	private PushNotificationType pushNotificationType;
	private String pushNotficationUrl;
	private String pushNotificationText;
	private String pushNotificationIcon;
	private String pushNotificationBadge;
	private boolean shouldSendToAllSubscriber;
	private String [] subscriberIds;
}
