package apps.kool.tms.api.agregate;

import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PublicKey;
import java.security.Security;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

import org.bouncycastle.jce.ECNamedCurveTable;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.jce.spec.ECNamedCurveParameterSpec;
import org.bouncycastle.jce.spec.ECPublicKeySpec;
import org.bouncycastle.math.ec.ECPoint;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Document( collection= "subscriberPushNotification")
public class SubscriberPushNotification {
	
	public SubscriberPushNotification() {
	  if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
	      Security.addProvider(new BouncyCastleProvider());
	  }
	}
	@JsonIgnore
    private @Id  ObjectId id;
	private String subscriberId; //hof
	private String username;

	private String pushNotificationAuth;
	private String pushNotificationKey;
	private String pushNotificationEndpoint;
	
	/**
	 * Returns the base64 encoded auth string as a byte[]
	 */
	public byte[] getAuthAsBytes() {
		return Base64.getDecoder().decode(getPushNotificationAuth());
	}

	public byte[] getKeyAsBytes() {
		return Base64.getDecoder().decode(getPushNotificationKey());
	}

	/**
	 * Returns the base64 encoded public key as a PublicKey object
	 */
	public PublicKey getUserPublicKey() throws NoSuchAlgorithmException, InvalidKeySpecException, NoSuchProviderException {
		KeyFactory kf = KeyFactory.getInstance("ECDH", BouncyCastleProvider.PROVIDER_NAME);
		ECNamedCurveParameterSpec ecSpec = ECNamedCurveTable.getParameterSpec("secp256r1");
		ECPoint point = ecSpec.getCurve().decodePoint(getKeyAsBytes());
		ECPublicKeySpec pubSpec = new ECPublicKeySpec(point, ecSpec);
		return kf.generatePublic(pubSpec);
	}
}
