package apps.kool.tms.api.reqres;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class WorkFlowResponse {

	private String goToRoute;
}
