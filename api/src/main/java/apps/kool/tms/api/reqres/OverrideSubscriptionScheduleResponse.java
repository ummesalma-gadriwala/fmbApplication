package apps.kool.tms.api.reqres;

import java.util.List;

import apps.kool.tms.api.agregate.OverrideSubscriptionSchedule;
import lombok.Data;

@Data
public class OverrideSubscriptionScheduleResponse extends APIResponse {
    List<OverrideSubscriptionSchedule> overrideSubscriptionSchedule;
}
