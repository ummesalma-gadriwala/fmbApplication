package apps.kool.tms.api.reqres;

import apps.kool.tms.api.agregate.User;
import lombok.Data;

@Data
public class SubcriberResponse extends APIResponse {
	
	private User user;

}
