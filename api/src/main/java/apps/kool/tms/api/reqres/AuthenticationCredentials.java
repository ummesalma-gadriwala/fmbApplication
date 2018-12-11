package apps.kool.tms.api.reqres;
import lombok.Data;

@Data
public class AuthenticationCredentials {
	
	private String username;
	private String firstLevelAuthenticationAnswer;
	private String secondLevelAuthenticationAnswer; 
	private String token;

}
